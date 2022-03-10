import { Config, DAppProvider, useEthers } from '@usedapp/core';
import { Interface, Fragment, JsonFragment } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { Wallet, initializeWallets } from './wallets';
import { BigNumber } from 'ethers';
import { parseEther } from '@ethersproject/units';
import {
  SwapParams,
  ProviderProps,
  MetaMaskProvider,
  RouteDetails,
  QuoteDetails,
} from './models';
import {
  APIErrorPayload,
  InsufficientFundsError,
  InvalidParamsError,
  IncompatibleNetworkError,
  UnsupportedNetworkError,
  InvalidJSONBodyError,
  InternalError,
  UnknownError,
} from '../errors';
import { getUniswapTokens, TokenInfo, TokenList } from '../tokens';
import {
  SWAP_ROUTER_ADDRESS,
  ROUTER_API,
  DEFAULTS,
  SUPPORTED_CHAINS,
  chainIdToNetwork,
} from './constants';
import { JsonRpcProvider } from '@ethersproject/providers';
import { uriToHttp } from './utils';

export const resolveWeth = (token: TokenInfo) => {
  if (token.symbol === 'WETH') {
    return {
      ...token,
      symbol: 'ETH',
    };
  } else {
    return token;
  }
};

export const wallets = initializeWallets(SUPPORTED_CHAINS);

export const config: Config = {
  autoConnect: false,
  notifications: {
    expirationPeriod: 30000,
    checkInterval: 2000,
  },
};

const handleQuoteRequest = async (url: string): Promise<QuoteDetails> => {
  const res = await fetch(url);
  const formattedResponse = await res.json();

  if (res.ok) {
    return formattedResponse as QuoteDetails;
  }
  return handleAPIErrors(res, formattedResponse);
};

const handleRouteRequest = async (url: string): Promise<RouteDetails> => {
  const res = await fetch(url);
  const formattedResponse = await res.json();

  if (res.ok) {
    const { methodParameters } = formattedResponse;
    return methodParameters as RouteDetails;
  }
  return handleAPIErrors(res, formattedResponse);
};

const handleAPIErrors = (res: Response, formattedResponse: any) => {
  const { detail, errorCode } = formattedResponse;
  switch (res.status) {
    case 400:
      throw new InvalidParamsError({ detail, errorCode } as APIErrorPayload);
    case 422:
      throw new InvalidJSONBodyError({
        detail,
        errorCode,
      } as APIErrorPayload);
    case 500:
      throw new InternalError({ detail, errorCode } as APIErrorPayload);
    default:
      throw new UnknownError();
  }
};

const validateRequest = (
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  amount?: number,
  balance?: number
) => {
  const { chainId: chainIdIn } = tokenIn;
  const { chainId: chainIdOut } = tokenOut;

  if (chainIdIn !== chainIdOut) {
    throw new IncompatibleNetworkError(tokenIn, tokenOut);
  }

  if (!SUPPORTED_CHAINS.includes(chainIdIn)) {
    throw new UnsupportedNetworkError();
  }

  if (balance && amount && amount > balance) {
    throw new InsufficientFundsError(tokenIn.symbol);
  }
};

export const getQuote = async (
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number, // not formatted
  exactOut: boolean = false
): Promise<QuoteDetails> => {
  validateRequest(tokenIn, tokenOut);

  const tradeType = exactOut ? 'exactOut' : 'exactIn';

  const formattedAmount = parseEther(inputAmount.toString()).toString();
  // token symbol "WETH"=> "ETH"
  const formattedTokenIn = resolveWeth(tokenIn);

  const url = `${ROUTER_API}/quote?tokenInAddress=${formattedTokenIn.symbol}&tokenInChainId=${tokenIn.chainId}&tokenOutAddress=${tokenOut.address}&tokenOutChainId=${tokenIn.chainId}&amount=${formattedAmount}&type=${tradeType}`;

  return handleQuoteRequest(url);
};

export const getRoute = async (
  balance: number,
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number,
  recipient: string,
  exactOut: boolean = false,
  options: {
    slippageTolerance: number;
    deadline: number;
  } = DEFAULTS
): Promise<RouteDetails> => {
  validateRequest(tokenIn, tokenOut, inputAmount, balance);

  const tradeType = exactOut ? 'exactOut' : 'exactIn';

  const formattedAmount = parseEther(inputAmount.toString()).toString();
  // token symbol "WETH"=> "ETH"
  const formattedTokenIn = resolveWeth(tokenIn);

  const { slippageTolerance, deadline } = options;
  const url = `${ROUTER_API}/quote?tokenInAddress=${formattedTokenIn.symbol}&tokenInChainId=${tokenIn.chainId}&tokenOutAddress=${tokenOut.address}&tokenOutChainId=${tokenOut.chainId}&amount=${formattedAmount}&type=${tradeType}&slippageTolerance=${slippageTolerance}&deadline=${deadline}&recipient=${recipient}`;

  return handleRouteRequest(url);
};

// return user's address page on Etherscan
export const blockExplorerAddressLink = (
  chainID: number,
  address: string
): string | undefined => {
  return chainIdToNetwork[chainID].getExplorerAddressLink(address);
};

// return user's transaction info page on Etherscan
export const blockExplorerTransactionLink = (
  chainID: number,
  transactionHash: string
): string | undefined => {
  return chainIdToNetwork[chainID].getExplorerTransactionLink(transactionHash);
};

// pass in [JSON].abi
export const loadInterface = (
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>
): Interface => {
  return new Interface(abi);
};

// pass in [JSON].abi & address
export const loadContract = (
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>,
  address: string
): Contract => {
  const contractInterface = loadInterface(abi);
  const contract = new Contract(address, contractInterface);

  return contract;
};

export const getSwapParams = async (
  balance: number,
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number,
  recipient: string,
  exactOut: boolean = false,
  options: {
    slippageTolerance: number;
    deadline: number;
  } = DEFAULTS
): Promise<SwapParams> => {
  try {
    const res = await getRoute(
      balance,
      tokenIn,
      tokenOut,
      inputAmount,
      recipient,
      exactOut,
      options
    );

    const { calldata, value } = res.methodParameters;
    return {
      data: calldata,
      to: SWAP_ROUTER_ADDRESS,
      value: BigNumber.from(value),
      gasPrice: BigNumber.from(res.gasPriceWei),
    };
  } catch (error) {
    // re-throw errors
    throw error;
  }
};

export const getTokens = async (): Promise<TokenList | undefined> => {
  const res = await getUniswapTokens();
  if (res.ok) {
    const formattedResponse = await res.json();
    return formattedResponse as TokenList;
  } else {
    throw new Error('Unable to fetch tokens');
  }
};

export const useAddTokenToMetamask = (
  token: TokenInfo
): {
  addToken: () => void;
  success: boolean | null;
} => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const { library } = useEthers();

  const addToken = useCallback(() => {
    if (library && isMetaMaskProvider(library) && token) {
      const { address, symbol, decimals, logoURI } = token;
      const logoURL = logoURI ? uriToHttp(logoURI)[0] : '';
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: address,
              symbol: symbol,
              decimals: decimals,
              image: logoURL,
            },
          },
        })
        .then(success => {
          setSuccess(success);
        })
        .catch(() => setSuccess(false));
    } else {
      setSuccess(false);
    }
  }, [library, token]);

  return { addToken, success };
};

// a type guard for MM specific methods/properties
export const isMetaMaskProvider = (
  library: MetaMaskProvider | JsonRpcProvider
): library is MetaMaskProvider => {
  return (library as MetaMaskProvider)?.provider?.request !== undefined;
};

export interface ContextProps {
  wallets: Wallet[];
  defaults: { [key: string]: number };
  getQuote: (
    tokenIn: TokenInfo,
    tokenOut: TokenInfo,
    inputAmount: number,
    exactOut?: boolean
  ) => Promise<QuoteDetails>;
  getRoute: (
    balance: number,
    tokenIn: TokenInfo,
    tokenOut: TokenInfo,
    inputAmount: number,
    recipient: string,
    exactOut?: boolean,
    options?: {
      slippageTolerance: number;
      deadline: number;
    }
  ) => Promise<RouteDetails>;
  blockExplorerAddressLink: (
    chainID: number,
    address: string
  ) => string | undefined;
  blockExplorerTransactionLink: (
    chainID: number,
    transactionHash: string
  ) => string | undefined;
  loadInterface: (
    abi: string | ReadonlyArray<Fragment | JsonFragment | string>
  ) => Interface;
  loadContract: (
    abi: string | ReadonlyArray<Fragment | JsonFragment | string>,
    address: string
  ) => Contract;
  getSwapParams: (
    balance: number,
    tokenIn: TokenInfo,
    tokenOut: TokenInfo,
    inputAmount: number,
    recipient: string,
    exactOut?: boolean,
    options?: {
      slippageTolerance: number;
      deadline: number;
    }
  ) => Promise<SwapParams>;
  getTokens: () => Promise<TokenList | undefined>;
  useAddTokenToMetamask: (
    token: TokenInfo
  ) => {
    addToken: () => void;
    success: boolean | null;
  };
  config: Config;
}

export const L2Context = createContext({} as ContextProps);

export const L2Provider = ({ children }: ProviderProps) => {
  const value = {
    wallets,
    defaults: DEFAULTS,
    getQuote,
    getRoute,
    blockExplorerAddressLink,
    blockExplorerTransactionLink,
    loadInterface,
    loadContract,
    getSwapParams,
    getTokens,
    useAddTokenToMetamask,
    config,
  };
  return (
    <L2Context.Provider value={value}>
      <DAppProvider config={config}>{children}</DAppProvider>
    </L2Context.Provider>
  );
};

export const useLayer2 = () => {
  return useContext(L2Context);
};

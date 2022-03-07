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
  OperationalError,
  NetworkError,
  IncompatibleChainIdError,
  UnsupportedNetworkError,
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

export const getQuote = async (
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number, // not formatted
  exactOut: boolean = false
): Promise<QuoteDetails> => {
  const tradeType = exactOut ? 'exactOut' : 'exactIn';
  const { chainId: chainIdIn } = tokenIn;
  const { chainId: chainIdOut } = tokenOut;

  if (chainIdIn !== chainIdOut) {
    throw new IncompatibleChainIdError(tokenIn, tokenOut);
  }

  if (!SUPPORTED_CHAINS.includes(chainIdIn)) {
    throw new UnsupportedNetworkError();
  }

  const formattedAmount = parseEther(inputAmount.toString()).toString();
  // token symbol "WETH"=> "ETH"
  const formattedTokenIn = resolveWeth(tokenIn);

  try {
    const res = await fetch(
      `${ROUTER_API}/quote?tokenInAddress=${formattedTokenIn.symbol}&tokenInChainId=${chainIdIn}&tokenOutAddress=${tokenOut.address}&tokenOutChainId=${chainIdIn}&amount=${formattedAmount}&type=${tradeType}`
    );
    const formattedResponse = await res?.json();

    if (res.status === 400) {
      throw new InvalidParamsError(formattedResponse as APIErrorPayload);
    }

    if (res.status === 200) {
      return formattedResponse as QuoteDetails;
    }

    // server error or some other error
    throw new OperationalError();
  } catch (error) {
    console.log(error);
    throw new OperationalError();
  }
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
  const tradeType = exactOut ? 'exactOut' : 'exactIn';
  const { chainId: chainIdIn } = tokenIn;
  const { chainId: chainIdOut } = tokenOut;
  const formattedAmount = parseEther(inputAmount.toString()).toString();

  if (chainIdIn !== chainIdOut) {
    throw new IncompatibleChainIdError(tokenIn, tokenOut);
  }

  if (!SUPPORTED_CHAINS.includes(chainIdIn)) {
    throw new UnsupportedNetworkError();
  }

  // token symbol "WETH"=> "ETH"
  const formattedTokenIn = resolveWeth(tokenIn);

  const { slippageTolerance, deadline } = options;

  try {
    if (inputAmount > balance) {
      throw new InsufficientFundsError(tokenIn.symbol);
    }

    const res = await fetch(
      `${ROUTER_API}/quote?tokenInAddress=${formattedTokenIn.symbol}&tokenInChainId=${chainIdIn}&tokenOutAddress=${tokenOut.address}&tokenOutChainId=${chainIdIn}&amount=${formattedAmount}&type=${tradeType}&slippageTolerance=${slippageTolerance}&deadline=${deadline}&recipient=${recipient}`
    );

    const formattedResponse = await res?.json();

    if (res.ok) {
      return formattedResponse as RouteDetails;
    } else if (res.status === 400) {
      // extract only detail & errorCode
      const { detail, errorCode } = formattedResponse;
      throw new InvalidParamsError({ detail, errorCode } as APIErrorPayload);
    } else {
      throw new NetworkError();
    }
  } catch (error) {
    // re-throw errors
    throw error;
  }
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
  const formattedResponse = await res.json();
  if (res.ok) {
    return formattedResponse as TokenList;
  } else {
    throw new Error('Unable to fetch tokens');
  }
};

export const uriToHttp = (uri: string): string[] => {
  const protocol = uri.split(':')[0].toLowerCase();
  switch (protocol) {
    case 'data':
      return [uri];
    case 'https':
      return [uri];
    case 'http':
      return ['https' + uri.substr(4), uri];
    case 'ipfs':
      return [
        `https://cloudflare-ipfs.com/ipfs/${
          uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2]
        }/`,
        `https://ipfs.io/ipfs/${uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2]}/`,
      ];
    case 'ipns':
      return [
        `https://cloudflare-ipfs.com/ipns/${
          uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2]
        }/`,
        `https://ipfs.io/ipns/${uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2]}/`,
      ];
    case 'ar':
      return [`https://arweave.net/${uri.match(/^ar:(\/\/)?(.*)$/i)?.[2]}`];
    default:
      return [];
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

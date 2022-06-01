import {
  Config,
  DAppProvider,
  Goerli,
  Hardhat,
  Localhost,
  Mainnet,
  Rinkeby,
  Ropsten,
  useEthers,
} from '@usedapp/core';
import { utils } from 'ethers';
import React, { createContext, useContext } from 'react';
import { initializeWallets } from './wallets';
import { BigNumber } from '@ethersproject/bignumber';
import {
  SwapParams,
  ProviderProps,
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
  NativeInputOnly,
  MinimumSlippageDeadlineError,
} from '../errors';
import { TokenInfo } from '../tokens';
import {
  SWAP_ROUTER_ADDRESS,
  ROUTER_API,
  DEFAULTS,
  SUPPORTED_CHAINS,
  chainIdToNetwork,
  NATIVE_INPUT_ONLY,
} from './constants';
import { isNativeToken, isValidRouteDetails, resolveWeth } from './utils';
import { useConnectEnsName, useEnsAvatar } from './hooks';
import providers from '@ethersproject/providers';

export const wallets = initializeWallets(SUPPORTED_CHAINS);

export const config: Config = {
  networks: [Localhost, Hardhat, Ropsten, Rinkeby, Mainnet, Goerli],
  autoConnect: false,
  readOnlyUrls: {
    [1]: providers.getDefaultProvider('mainnet'), //'https://eth-mainnet.alchemyapi.io/v2/Gb07nbsh-9IOdoizAI7nL4wcHl_8MYrt',
    [3]: providers.getDefaultProvider('ropsten'), //'https://eth-ropsten.alchemyapi.io/v2/NIbcpbkDXDzKnORvyQ7GqRBdBVffgP27',
    [4]: providers.getDefaultProvider('rinkeby'), //'https://eth-rinkeby.alchemyapi.io/v2/f6UW9EauWWDD4JL4bHcsY76Cf5wiq-xk',
    [5]: providers.getDefaultProvider('goerli'), //'https://eth-goerli.alchemyapi.io/v2/cSDWnBVR4hsqV2kTSJfWYH0Wor7KVvIu',
  },
  notifications: {
    expirationPeriod: 30000,
    checkInterval: 2000,
  },
};

export async function handleAPIRequest<T>(
  url: string,
  apiKey: string,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(url, {
    signal: signal,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-Key': apiKey,
    },
  });
  const formattedResponse: T = await res.json();
  if (res.ok) {
    return formattedResponse;
  }
  return handleAPIErrors(res, formattedResponse);
}

const handleAPIErrors = (res: Response, formattedResponse: any): never => {
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

export const validateRequest = (
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

  if (NATIVE_INPUT_ONLY && !isNativeToken(tokenIn)) {
    throw new NativeInputOnly();
  }

  if (balance && amount && amount > balance) {
    throw new InsufficientFundsError(tokenIn.symbol);
  }
};

export const getQuote = async (
  tokenIn: TokenInfo,
  tokenOut: TokenInfo,
  inputAmount: number, // not formatted
  exactOut: boolean = false,
  apiKey: string,
  signal?: AbortSignal
): Promise<QuoteDetails> => {
  validateRequest(tokenIn, tokenOut);

  const tradeType = exactOut ? 'exactOut' : 'exactIn';

  const formattedAmount = utils.parseEther(inputAmount.toString()).toString();
  // token symbol "WETH"=> "ETH"
  const formattedTokenIn = resolveWeth(tokenIn);
  const tokenInAddress = isNativeToken(formattedTokenIn)
    ? formattedTokenIn.symbol
    : formattedTokenIn.address;

  const url = `${ROUTER_API}/quote?tokenInAddress=${tokenInAddress}&tokenInChainId=${tokenIn.chainId}&tokenOutAddress=${tokenOut.address}&tokenOutChainId=${tokenIn.chainId}&amount=${formattedAmount}&type=${tradeType}`;

  return handleAPIRequest<QuoteDetails>(url, apiKey, signal);
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
  } = DEFAULTS,
  apiKey: string,
  signal?: AbortSignal
): Promise<RouteDetails> => {
  validateRequest(tokenIn, tokenOut, inputAmount, balance);

  const tradeType = exactOut ? 'exactOut' : 'exactIn';

  const formattedAmount = utils.parseEther(inputAmount.toString()).toString();
  // token symbol "WETH"=> "ETH"
  const formattedTokenIn = resolveWeth(tokenIn);
  const tokenInAddress = isNativeToken(formattedTokenIn)
    ? formattedTokenIn.symbol
    : formattedTokenIn.address;

  const { slippageTolerance, deadline } = options;
  const url = `${ROUTER_API}/quote?tokenInAddress=${tokenInAddress}&tokenInChainId=${tokenIn.chainId}&tokenOutAddress=${tokenOut.address}&tokenOutChainId=${tokenOut.chainId}&amount=${formattedAmount}&type=${tradeType}&slippageTolerance=${slippageTolerance}&deadline=${deadline}&recipient=${recipient}`;

  return handleAPIRequest<RouteDetails>(url, apiKey, signal);
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
  } = DEFAULTS,
  apiKey: string,
  signal?: AbortSignal
): Promise<SwapParams> => {
  try {
    const res = await getRoute(
      balance,
      tokenIn,
      tokenOut,
      inputAmount,
      recipient,
      exactOut,
      options,
      apiKey,
      signal
    );

    if (!isValidRouteDetails(res)) {
      throw new MinimumSlippageDeadlineError();
    }

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

interface EnsState {
  ensName: string | null;
  ensAvatar: string | null;
}

export const EnsContext = createContext({} as EnsState);

const EnsProvider = ({ children }: ProviderProps) => {
  const { account } = useEthers();
  const ensName = useConnectEnsName();
  const ensAvatar = useEnsAvatar([ensName, account]);
  const ensPayload = {
    ensName: ensName,
    ensAvatar: ensAvatar,
  };

  return (
    <EnsContext.Provider value={ensPayload}>{children}</EnsContext.Provider>
  );
};

export const L2Provider = ({ children }: ProviderProps) => {
  return (
    <DAppProvider config={config}>
      <EnsProvider>{children}</EnsProvider>
    </DAppProvider>
  );
};

export const useLayer2 = () => {
  return useEthers();
};

export const useEns = () => {
  return useContext(EnsContext);
};

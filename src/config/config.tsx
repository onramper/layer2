import { Config, DAppProvider, Mainnet, Chain, Rinkeby } from '@usedapp/core';
import { Interface, Fragment, JsonFragment } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { ERC20 } from '../abis';
import React, { createContext, ReactNode, useContext } from 'react';
import { Wallet, initializeWallets } from './wallets';
import { BigNumber } from 'ethers';
import { parseEther } from '@ethersproject/units';

// No need change the address, same is for all testnets and mainnet
export const SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
export const ROUTER_API =
  'https://a7sf9dqtif.execute-api.eu-central-1.amazonaws.com/prod';
export const TOKEN_LIST = 'https://tokens.uniswap.org/';

export const DEFAULTS = {
  slippageTolerance: 1, // 1%
  deadline: 200, // 200 seconds
};

export const SUPPORTED_CHAINS = [1, 4];

export interface SwapParams {
  data: string; // route.methodParameters.calldata,
  to: string; //  V3_SWAP_ROUTER_ADDRESS,
  value: BigNumber; // BigNumber.from(route.methodParameters.value),
  gasPrice: BigNumber;
}
// Interfaces
interface ProviderProps {
  children?: ReactNode;
}

// use this interface for type assertion inside addERC20ToMetamask()
interface WatchAssetParams {
  type: string; // In the future, other standards will be supported
  options: {
    address: string; // The address of the token contract
    symbol: string; // A ticker symbol or shorthand, up to 5 characters
    decimals: number; // The number of token decimals
    image: string; // A string url of the token logo
  };
}

export interface Info {
  name: string;
  symbol: string;
  decimals: number;
  wethAddress: string;
}

export interface QuoteResult {
  blockNumber: string;
  amount: string;
  amountDecimals: string;
  quote: string;
  quoteDecimals: string;
  quoteGasAdjusted: string;
  quoteGasAdjustedDecimals: string;
  gasUseEstimateQuote: string;
  gasUseEstimateQuoteDecimals: string;
  gasUseEstimate: string;
  gasUseEstimateUSD: string;
  gasPriceWei: string;
  route: any[][];
  routeString: string;
  quoteId: string;
}

export interface RouteResult extends QuoteResult {
  methodParameters: {
    calldata: string; // long hexString
    value: string; // 0x00
  };
}

const chainIdToNetwork: { [key: number]: Chain } = {
  1: Mainnet,
  4: Rinkeby,
};

const chainIDToNetworkInfo: { [key: number]: Info } = {
  1: {
    name: 'mainnet',
    symbol: 'ETH',
    decimals: 18,
    wethAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  4: {
    name: 'rinkeby',
    symbol: 'ETH',
    decimals: 18,
    wethAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  },
};

export class Layer2 {
  public wallets: Wallet[];
  public config: Config;
  public interfaces: { [key: string]: Interface };
  public defaults: { [key: string]: number };

  constructor() {
    this.wallets = initializeWallets(SUPPORTED_CHAINS);
    this.defaults = DEFAULTS;

    this.config = {
      autoConnect: false,
      notifications: {
        expirationPeriod: 30000,
        checkInterval: 2000,
      },
      readOnlyChainId: undefined,
    };

    this.interfaces = {
      erc20Interface: this.loadInterface(ERC20),
    };
  }

  public async getQuote(
    chainID: number,
    inputAmount: number, // not formatted
    tokenOut: string, // address
    exactOut: boolean = false
  ): Promise<QuoteResult | unknown> {
    const tradeType = exactOut ? 'exactOut' : 'exactIn';
    const formattedAmount = parseEther(inputAmount.toString()).toString();

    try {
      const res = await fetch(
        `${ROUTER_API}/quote?tokenInAddress=${chainIDToNetworkInfo[chainID].symbol}&tokenInChainId=${chainID}&tokenOutAddress=${tokenOut}&tokenOutChainId=${chainID}&amount=${formattedAmount}&type=${tradeType}`
      );
      return res.json();
    } catch (error) {
      return error;
    }
  }

  public async getRoute(
    chainID: number,
    inputAmount: number,
    tokenOut: string,
    recipient: string,
    exactOut: boolean = false
  ): Promise<RouteResult | unknown> {
    const tradeType = exactOut ? 'exactOut' : 'exactIn';
    const formattedAmount = parseEther(inputAmount.toString()).toString();
    const { slippageTolerance, deadline } = DEFAULTS;
    try {
      const res = await fetch(
        `${ROUTER_API}/quote?tokenInAddress=${chainIDToNetworkInfo[chainID].symbol}&tokenInChainId=${chainID}&tokenOutAddress=${tokenOut}&tokenOutChainId=${chainID}&amount=${formattedAmount}&type=${tradeType}&slippageTolerance=${slippageTolerance}&deadline=${deadline}&recipient=${recipient}`
      );
      return res.json();
    } catch (error) {
      return error;
    }
  }

  public async getSwapParams(
    chainID: number,
    inputAmount: number,
    tokenOut: string,
    recipient: string,
    exactOut: boolean = false
  ): Promise<SwapParams | unknown> {
    try {
      const res = await this.getRoute(
        chainID,
        inputAmount,
        tokenOut,
        recipient,
        exactOut
      );
      const routeResult = res as RouteResult;
      const { calldata, value } = routeResult.methodParameters;
      return {
        data: calldata,
        to: SWAP_ROUTER_ADDRESS,
        value: BigNumber.from(value),
        gasPrice: BigNumber.from(routeResult.gasPriceWei),
      } as SwapParams;
    } catch (error) {
      return error;
    }
  }

  public async getTokens() {
    try {
      const res = await fetch(TOKEN_LIST);
      return res.json();
    } catch (error) {
      return error;
    }
  }

  // return user's address page on Etherscan
  blockExplorerAddressLink(
    chainID: number,
    address: string
  ): string | undefined {
    return chainIdToNetwork[chainID].getExplorerAddressLink(address);
  }

  // return user's transaction info page on Etherscan
  blockExplorerTransactionLink(
    chainID: number,
    transactionHash: string
  ): string | undefined {
    return chainIdToNetwork[chainID].getExplorerTransactionLink(
      transactionHash
    );
  }

  // pass in [JSON].abi
  public loadInterface(
    abi: string | ReadonlyArray<Fragment | JsonFragment | string>
  ): Interface {
    return new Interface(abi);
  }

  // pass in [JSON].abi & address
  public loadContract(
    abi: string | ReadonlyArray<Fragment | JsonFragment | string>,
    address: string
  ): Contract {
    const contractInterface = this.loadInterface(abi);
    const contract = new Contract(address, contractInterface);

    return contract;
  }
}

export const addTokenToMetamask = async (
  library: any,
  address: string,
  decimals: number
): Promise<boolean> => {
  try {
    const result = await library.provider?.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: address,
          symbol: 'DAI',
          decimals: decimals,
        },
      } as WatchAssetParams,
    });

    return result;
  } catch (error) {
    return false;
  }
};

export const getConfig = (): Config => {
  return {
    autoConnect: false,
    notifications: {
      expirationPeriod: 30000,
      checkInterval: 2000,
    },
  };
};

export interface ContextProps {
  layer2: Layer2;
  addTokenToMetamask: (
    library: any,
    address: string,
    decimals: number
  ) => Promise<boolean>;
  config: Config;
  wallets: Wallet[];
}

export const L2Context = createContext({} as ContextProps);

export const L2Provider = ({ children }: ProviderProps) => {
  const layer2 = new Layer2();
  const config = getConfig();
  const wallets = layer2.wallets;

  const value = {
    layer2,
    addTokenToMetamask,
    config,
    wallets,
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

import { Config, DAppProvider, Mainnet, Chain, Rinkeby } from '@usedapp/core';
import { Interface, Fragment, JsonFragment } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { ERC20 } from '../abis';
import React, { createContext, useContext } from 'react';
import { Wallet, initializeWallets } from './wallets';
import { BigNumber } from 'ethers';
import { parseEther } from '@ethersproject/units';
import {
  Info,
  SwapParamsResult,
  ProviderProps,
  WatchAssetParams,
  RouteResult,
  QuoteResult,
  Result,
} from './models';

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
  ): Promise<QuoteResult> {
    const tradeType = exactOut ? 'exactOut' : 'exactIn';
    const formattedAmount = parseEther(inputAmount.toString()).toString();

    try {
      const res = await fetch(
        `${ROUTER_API}/quote?tokenInAddress=${chainIDToNetworkInfo[chainID].symbol}&tokenInChainId=${chainID}&tokenOutAddress=${tokenOut}&tokenOutChainId=${chainID}&amount=${formattedAmount}&type=${tradeType}`
      );
      if (res.status === 200) {
        const formattedResponse = await res.json();
        return Result.ok(formattedResponse);
      } else {
        return Result.fail('unable to get quote');
      }
    } catch (error) {
      return Result.fail('unable to get quote');
    }
  }

  public async getRoute(
    chainID: number,
    inputAmount: number,
    tokenOut: string,
    recipient: string,
    exactOut: boolean = false
  ): Promise<RouteResult> {
    const tradeType = exactOut ? 'exactOut' : 'exactIn';
    const formattedAmount = parseEther(inputAmount.toString()).toString();
    const { slippageTolerance, deadline } = DEFAULTS;
    try {
      const res = await fetch(
        `${ROUTER_API}/quote?tokenInAddress=${chainIDToNetworkInfo[chainID].symbol}&tokenInChainId=${chainID}&tokenOutAddress=${tokenOut}&tokenOutChainId=${chainID}&amount=${formattedAmount}&type=${tradeType}&slippageTolerance=${slippageTolerance}&deadline=${deadline}&recipient=${recipient}`
      );
      if (res.status === 200) {
        const formattedResponse = await res.json();
        return Result.ok(formattedResponse);
      } else {
        return Result.fail('unable to get route');
      }
    } catch (error) {
      if (error instanceof Error) {
        return Result.fail(error.message);
      } else {
        return Result.fail('unable to get route');
      }
    }
  }

  public async getSwapParams(
    chainID: number,
    inputAmount: number,
    tokenOut: string,
    recipient: string,
    exactOut: boolean = false
  ): Promise<SwapParamsResult> {
    try {
      const res = await this.getRoute(
        chainID,
        inputAmount,
        tokenOut,
        recipient,
        exactOut
      );
      if (res.isSuccess && res.value) {
        const { calldata, value } = res.value.methodParameters;
        return Result.ok({
          data: calldata,
          to: SWAP_ROUTER_ADDRESS,
          value: BigNumber.from(value),
          gasPrice: BigNumber.from(res.value.gasPriceWei),
        });
      } else {
        return Result.fail('Failed to get Swap Params');
      }
    } catch (error) {
      if (error instanceof Error) {
        return Result.fail(error.message);
      } else {
        return Result.fail('unable to get route');
      }
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

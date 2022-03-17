import { Mainnet, Chain, Rinkeby } from '@usedapp/core';
import { Info } from './models';

export const NATIVE_INPUT_ONLY = true; // for now we only allow ETH => ERC20

export const NativeCurrencies = [
  {
    chainId: 1,
    symbol: 'ETH',
  },
  {
    chainId: 3,
    symbol: 'ETH',
  },
  {
    chainId: 4,
    symbol: 'ETH',
  },
  {
    chainId: 5,
    symbol: 'ETH',
  },
];

// No need change the address, same is for all testnets and mainnet
export const SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
export const ROUTER_API =
  'https://a7sf9dqtif.execute-api.eu-central-1.amazonaws.com/prod';

export const DEFAULTS = {
  slippageTolerance: 1, // 1%
  deadline: 200, // 200 seconds
};

export const SUPPORTED_CHAINS = [1, 4];

export const chainIdToNetwork: { [key: number]: Chain } = {
  1: Mainnet,
  4: Rinkeby,
};

export const chainIDToNetworkInfo: { [key: number]: Info } = {
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

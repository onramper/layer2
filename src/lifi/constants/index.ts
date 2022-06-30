import { RouteOptions } from '@lifinance/sdk';

export const LIFI_DEFAULTS: RouteOptions = {
  slippage: 3 / 100, // 3%
  order: 'RECOMMENDED',
};

interface Chain {
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  address: string; // address for native token
}

export const lifiChains: Chain[] = [
  {
    chainId: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
  },
  {
    chainId: 3,
    name: 'Ropsten',
    symbol: 'ROP',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
  },
  {
    chainId: 4,
    name: 'Rinkeby',
    symbol: 'RNK',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
  },
  {
    chainId: 5,
    name: 'Goerli',
    symbol: 'GRL',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
  },
  {
    chainId: 42,
    name: 'Kovan',
    symbol: 'KOV',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
  },
  {
    chainId: 69,
    name: 'Optimism Kovan',
    symbol: 'ETH',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
  },
];

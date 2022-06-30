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
  logoURI: string;
}

export const lifiChains: Chain[] = [
  {
    chainId: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    chainId: 3,
    name: 'Ropsten',
    symbol: 'ROP',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    chainId: 4,
    name: 'Rinkeby',
    symbol: 'RNK',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    chainId: 5,
    name: 'Goerli',
    symbol: 'GRL',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    chainId: 42,
    name: 'Kovan',
    symbol: 'KOV',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
  {
    chainId: 69,
    name: 'Optimism Kovan',
    symbol: 'ETH',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000', // address for native token
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
  },
];

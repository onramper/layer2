import {
  blockExplorerAddressLink,
  blockExplorerTransactionLink,
  getQuote,
} from '../src';
import { quoteResponse } from './mocks/responses';

// DEFINE CONSTANTS
const API_KEY = '1234';
const CHAIN_ID = 1;
const USER_WALLET = '0xC54070dA79E7E3e2c95D3a91fe98A42000e65a48';
const TX_HASH =
  '0x4ae403ad01bee9a3192cede2d2ac2e398775ca7b145af8cad86a139fd507fee8';

const weth = {
  name: 'Wrapped Ether',
  address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  symbol: 'WETH',
  decimals: 18,
  chainId: 4,
  logoURI:
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
};
const uni = {
  name: 'Uniswap',
  address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  symbol: 'UNI',
  decimals: 18,
  chainId: 4,
  logoURI: 'ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg',
};
// SYNCHRONOUS FUNCTIONS
describe('blockExplorerAddressLink', () => {
  it('returns a usable link from chainID and address', () => {
    const link = blockExplorerAddressLink(CHAIN_ID, USER_WALLET);
    expect(typeof link).toBe('string');
  });
});

describe('blockExplorerTransactionLink', () => {
  it('returns a usable link from chainID and transaction hash', () => {
    const link = blockExplorerTransactionLink(CHAIN_ID, TX_HASH);
    expect(typeof link).toBe('string');
  });
});

// ASYNCHRONOUS FUNCTIONS

describe('getQuote', () => {
  it('returns correct data', async () => {
    const res = await getQuote(weth, uni, 0.1, false, API_KEY);
    expect(res).toEqual(quoteResponse);
  });
});

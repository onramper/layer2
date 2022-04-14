import {
  blockExplorerAddressLink,
  blockExplorerTransactionLink,
  getQuote,
  IncompatibleNetworkError,
  InsufficientFundsError,
  InvalidParamsError,
  UnsupportedNetworkError,
  handleAPIRequest,
  validateRequest,
  APIErrorPayload,
  InvalidJSONBodyError,
  InternalError,
  UnknownError,
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

describe('validateRequest', () => {
  it('throws NativeInputOnly error', () => {
    expect(() => validateRequest(uni, weth)).toThrow(
      'You are only allowed to select a native token as Input at this stage'
    );
  });

  it('throws IncompatibleNetworkError error', () => {
    const expectedError = new IncompatibleNetworkError(weth, {
      ...uni,
      chainId: 1,
    });
    expect(() => validateRequest(weth, { ...uni, chainId: 1 })).toThrow(
      expectedError.message
    );
  });

  it('throws UnsupportedNetworkError error', () => {
    const expectedError = new UnsupportedNetworkError();
    expect(() =>
      validateRequest({ ...weth, chainId: 5 }, { ...uni, chainId: 5 })
    ).toThrow(expectedError.message);
  });

  it('throws InsufficientFundsError error', () => {
    const expectedError = new InsufficientFundsError(weth.symbol);
    expect(() => validateRequest(weth, uni, 100, 50)).toThrow(
      expectedError.message
    );
  });
});

// ASYNCHRONOUS FUNCTIONS

describe('getQuote', () => {
  it('returns correct data', async () => {
    const res = await getQuote(weth, uni, 0.1, false, API_KEY);
    expect(res).toEqual(quoteResponse);
  });

  it('throws errors if inputs are invalid', async () => {
    await expect(
      getQuote(
        { ...weth, chainId: 5 },
        { ...uni, chainId: 5 },
        0.1,
        false,
        API_KEY
      )
    ).rejects.toThrowError();
  });
});

describe('handleApiErrors', () => {
  it('throws InvalidParamsError when API returns 400', async () => {
    const invalidAddress = '0xC54070dA79E7E3e2c95D3a91fe98A42000e65a48';
    const expectedError = new InvalidParamsError({
      detail: `Could not find token with address "${invalidAddress}"`,
      errorCode: 'TOKEN_IN_INVALID',
    });

    await expect(
      handleAPIRequest(`api400?invalidAddress=${invalidAddress}`, API_KEY)
    ).rejects.toThrow(expectedError.message);
  });

  it('throws InvalidJSONBodyError when API returns 422', async () => {
    const expectedError = new InvalidJSONBodyError({
      detail: 'Invalid JSON body',
      errorCode: 'VALIDATION_ERROR',
    } as APIErrorPayload);

    await expect(handleAPIRequest('api422', API_KEY)).rejects.toThrow(
      expectedError.message
    );
  });

  it('throws InternalError when API returns 500', async () => {
    const expectedError = new InternalError({
      errorCode: 'INTERNAL_ERROR',
      detail: 'Unexpected error',
    } as APIErrorPayload);

    await expect(handleAPIRequest('api500', API_KEY)).rejects.toThrow(
      expectedError.message
    );
  });

  it('throws UnknownError when API returns unrecognized status code', async () => {
    const expectedError = new UnknownError();

    await expect(handleAPIRequest('api300', API_KEY)).rejects.toThrow(
      expectedError.message
    );
  });
});

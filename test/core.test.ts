import { blockExplorerAddressLink, blockExplorerTransactionLink } from '../src';
const CHAIN_ID = 1;
const USER_WALLET = '0xC54070dA79E7E3e2c95D3a91fe98A42000e65a48';
const TX_HASH =
  '0x4ae403ad01bee9a3192cede2d2ac2e398775ca7b145af8cad86a139fd507fee8';

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

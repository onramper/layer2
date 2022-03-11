import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { JsonRpcProvider } from '@ethersproject/providers';
import { MetaMaskProvider } from './models';
import { isAddress } from '@ethersproject/address';

// returns formatted string for UI display
export const formatTokenAmount = (
  decimals: number,
  amount: BigNumber
): string => {
  return amount ? formatUnits(amount, decimals) : '0.00';
};

// returns "0x" padded hex of chain ID
export const toHex = (decimal: number): string => {
  return '0x' + decimal.toString(16);
};

export const isMetamaskEnabled = (): boolean => {
  try {
    if ((window as any)?.ethereum?.isMetaMask === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
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

export const getAddressFromEnsName = (
  ensName: string,
  library: JsonRpcProvider
) => {
  return library.resolveName(ensName);
};

export const getEnsNameFromAddress = (
  address: string,
  library: JsonRpcProvider
) => {
  if (isAddress(address)) {
    return library.lookupAddress(address);
  } else return null;
};

// a type guard for MM specific methods/properties
export const isMetaMaskProvider = (
  library: MetaMaskProvider | JsonRpcProvider
): library is MetaMaskProvider => {
  return (library as MetaMaskProvider)?.provider?.request !== undefined;
};

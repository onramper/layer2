import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

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

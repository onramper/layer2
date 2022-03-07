import {
  chainIdToNetwork,
  chainIDToNetworkInfo,
  SUPPORTED_CHAINS,
} from '@config/constants';
import { TokenInfo } from 'src/tokens';

// if (inputAmount > balance)
export class InsufficientFundsError extends Error {
  constructor(token: string) {
    super(`You do not have enough ${token} to perform this action.`);
    this.name = 'Insufficient Funds';
  }
}

// if some unexpected exception is thrown
export class OperationalError extends Error {
  constructor() {
    super('Internal Error');
  }
}

// if some unexpected exception is thrown
export class NetworkError extends Error {
  constructor() {
    super('Unknown Network error');
  }
}

export interface APIErrorPayload {
  detail: string;
  errorCode: string;
}

// if 1 or more arguments to router API are invalid
export class InvalidParamsError extends Error {
  public readonly detail: string;
  public readonly errorCode: string;

  constructor({ detail, errorCode }: APIErrorPayload) {
    super('Invalid arguments');
    this.detail = detail;
    this.errorCode = errorCode;
  }
}

export class IncompatibleChainIdError extends Error {
  constructor(tokenIn: TokenInfo, tokenOut: TokenInfo) {
    super(
      `You can not swap across networks. Input token (${
        tokenIn.symbol
      }) is not on the same network as output token (${
        tokenOut.symbol
      }). \nBoth tokens must be one ${chainIdToNetwork[tokenIn.chainId]}`
    );
    this.name = 'Incompatible Chain IDs';
  }
}

export class UnsupportedNetworkError extends Error {
  constructor() {
    super(
      `Unsupported Network! \nLayer2 transactions only supported on the following networks: ${SUPPORTED_CHAINS.forEach(
        id => id in chainIDToNetworkInfo && chainIDToNetworkInfo[id]?.name
      )}`
    );
    this.name = 'Unsupported Network';
  }
}

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

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}

// ? create custom error types here and export them from barrel file

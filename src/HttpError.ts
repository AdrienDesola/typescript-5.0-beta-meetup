export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function isHttpError(error: Error|HttpError): error is HttpError {
  return (error as HttpError).statusCode !== undefined;
}

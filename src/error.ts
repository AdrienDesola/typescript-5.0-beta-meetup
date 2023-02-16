export interface HttpError extends Error {
  statusCode: number;
  errorMessage: string;
}

export function isHttpError(error: Error): error is HttpError {
  return (error as HttpError).statusCode !== undefined &&
    (error as HttpError).errorMessage !== undefined
}

function loggedMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);

  function replacementMethod(this: any, ...args: any[]) {
    console.log(`LOG: Entering method '${methodName}'.`)
    const result = originalMethod.call(this, ...args);
    console.log(`LOG: Exiting method '${methodName}'.`)
    return result;
  }

  return replacementMethod;
}

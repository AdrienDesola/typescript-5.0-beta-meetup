import { NextFunction, Request, Response } from "express";
import { isHttpError } from "../HttpError";

export function errorHandler() {
  return function classMethodDecorator(originalMethod: Function, _context: ClassMethodDecoratorContext) {

    return function wrap(req: Request, res: Response, next: NextFunction) {
      try {
        originalMethod.call(this, req, res, next);
      } catch (error) {
        if (isHttpError(error)) {
          res.statusCode = error.statusCode;
          res.send(error.message);
        } else {
          console.error('An unexpected Error happened! Please investigate', error);
          res.statusCode = 500;
          res.send('Oops our bad!');
        }
      }
    }
  }
}

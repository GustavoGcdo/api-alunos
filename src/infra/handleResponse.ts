import { Response } from 'express';
import { HttpStatus } from './http-status';
import { Result } from './result';
import { ValidationFailedError } from './validationFailedError';

export abstract class HandleResponse {
  public static handle(response: Response, status: HttpStatus, result: Result) {
    return response.status(status).send(result);
  }

  public static handleError(response: Response, status: HttpStatus, error: Error) {
    if (error instanceof ValidationFailedError) {
      return response.status(status).send(new Result(null, error.message, false, error.reports));
    }

    return response
      .status(HttpStatus.INTERNAL_ERROR)
      .send(
        new Result(null, error.message, false, [
          { name: 'server', message: 'internal server error' },
        ]),
      );
  }
}
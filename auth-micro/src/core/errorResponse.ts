import { AuthFailureResponse,ForbiddenResponse,BadRequestResponse,NotFoundResponse,InternalErrorResponse } from "./apiResponse";
import { Response } from "express"
import { logger } from "./logger";

enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    ACCESS_TOKEN = 'AccessTokenError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError',
    NO_ENTRY = 'NoEntryError',
    NO_DATA = 'NoDataError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForbiddenError',
}


export abstract class ErrorResponse extends Error {
    public static data;
    constructor(public type: ErrorType, public message: string = 'error', data:any = null) {
        super(type);
        ErrorResponse.data = data
    }

    public static handle(err: ErrorResponse, res: Response): Response {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:                
            case ErrorType.ACCESS_TOKEN:
                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new NotFoundResponse(err.message, ErrorResponse.data).send(res);
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse(err.message,ErrorResponse.data ).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse(err.message).send(res);
            default: {
                // Do not send failure message in production as it may send sensitive data
                //if (environment === 'production') message = 'Something wrong happened.';
                if (process.env.NODE_ENV === 'development') {
                  const error = err.stack ? err.stack : (err.message ? err.message : err.toString())
                  logger.error(error);
                  return new InternalErrorResponse(error).send(res)
                }
                return new InternalErrorResponse().send(res);
            }
        }
    }

}



export class AuthFailureError extends ErrorResponse {
    constructor(message = 'Invalid Credentials') {
      super(ErrorType.UNAUTHORIZED, message);
    }
  }
  
  export class InternalError extends ErrorResponse {
    constructor(message = 'Internal error') {
      super(ErrorType.INTERNAL, message);
    }
  }
  
  export class BadRequestError extends ErrorResponse {
    constructor(message = 'Bad Request', data=null) {
      super(ErrorType.BAD_REQUEST, message, data);
    }
  }
  
  export class NotFoundError extends ErrorResponse {
    constructor(message = 'Not Found', data=null) {
      super(ErrorType.NOT_FOUND, message, data);
    }
  }
  
  export class ForbiddenError extends ErrorResponse {
    constructor(message = 'Permission denied') {
      super(ErrorType.FORBIDDEN, message);
    }
  }
  
  export class NoEntryError extends ErrorResponse {
    constructor(message = "Entry don't exists") {
      super(ErrorType.NO_ENTRY, message);
    }
  }
  
  export class BadTokenError extends ErrorResponse {
    constructor(message = 'Token is not valid') {
      super(ErrorType.BAD_TOKEN, message);
    }
  }
  
  export class TokenExpiredError extends ErrorResponse {
    constructor(message = 'Token is expired') {
      super(ErrorType.TOKEN_EXPIRED, message);
    }
  }
  
  export class NoDataError extends ErrorResponse {
    constructor(message = 'No data available') {
      super(ErrorType.NO_DATA, message);
    }
  }
  
  export class AccessTokenError extends ErrorResponse {
    constructor(message = 'Invalid access token') {
      super(ErrorType.ACCESS_TOKEN, message);
    }
  }
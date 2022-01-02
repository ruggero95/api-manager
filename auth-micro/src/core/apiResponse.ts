import { Response } from "express"

enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

export class ApiResponse {
    constructor(protected error: boolean, protected status: ResponseStatus, protected message: string,) {

    }
    prepare<T extends ApiResponse>(res: Response, apiResponse: T) {
        return res.status(this.status).json({ ...apiResponse })
    }
    send(res: Response) {
        return this.prepare(res, this)
    }

}

export class SuccessResponse<T> extends ApiResponse {
    constructor(message: string, private data: T | null = null) {
        super(false, ResponseStatus.SUCCESS, message)
    }
    send(res: Response):any {
        return super.prepare<SuccessResponse<T>>(res, this)
    }
}


export class NotFoundResponse<T> extends ApiResponse {
    private url: string | undefined;

    constructor(message = 'Not Found', private data:T|null=null) {
        super(true, ResponseStatus.NOT_FOUND, message);
    }

    send(res: Response): Response {
        this.url = res.req?.originalUrl;
        return super.prepare<NotFoundResponse<T>>(res, this);
    }
}

export class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
        super(true, ResponseStatus.FORBIDDEN, message);
    }
}

export class BadRequestResponse<T> extends ApiResponse {
    constructor(message = 'Bad Parameters', private data:T|null=null) {
        super(true, ResponseStatus.BAD_REQUEST, message);
    }
    send(res: Response): Response {
        return super.prepare<BadRequestResponse<T>>(res, this);
    }
}

export class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Authentication Failure') {
        super(true, ResponseStatus.UNAUTHORIZED, message);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(true, ResponseStatus.INTERNAL_ERROR, message);
    }
}
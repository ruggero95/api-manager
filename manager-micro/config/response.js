const response = {
    codes: Object.freeze({
        SUCCESS: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500
    }),
    successResponse: (res, message, data = null) => {
        return res.status(response.codes.SUCCESS).json({error:false, message:message,data:data,status:response.codes.SUCCESS})
    },
    errorResponse: (res, message, data = null) => {
        return res.status(response.codes.SUCCESS).json({error:true, message:message,data:data,status:response.codes.SUCCESS})
    },
    badRequestResponse: (res, message= 'Bad Request', data = null) => {
        return res.status(response.codes.BAD_REQUEST).json({error:true, message:message,data:data,status:response.codes.BAD_REQUEST})
    },
    unauthorizedResponse:(res, message = 'Unauthorized', data = null)=>{
        return res.status(response.codes.UNAUTHORIZED).json({error:true,message:message,data:data,status:response.codes.UNAUTHORIZED})
    },
    internalErrorResponse:(res, message = 'Internal Error', data = null)=>{
        return res.status(response.codes.INTERNAL_ERROR).json({error:true,message:message,data:data,status:response.codes.INTERNAL_ERROR})
    },
    notFoundResponse:(res, message = 'Not found', data = null)=>{
        return res.status(response.codes.NOT_FOUND).json({error:true,message:message,data:data,status:response.codes.NOT_FOUND})
    }
}

module.exports = response
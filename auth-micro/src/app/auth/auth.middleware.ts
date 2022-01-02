import { AuthFailureResponse } from "core/apiResponse";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export class AuthMiddleware{
    public static checkToken(req:Request, res:Response, next:NextFunction){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return new AuthFailureResponse('Missing access token').send(res)
        }
        return jwt.verify(token, process.env.ACCESS_TOKEN , function(err: jwt.VerifyErrors | null, payload: jwt.JwtPayload){
            if(!payload || !payload.username){
                return new AuthFailureResponse('Token not valid').send(res)
            }
            if(err){
                return new AuthFailureResponse('Token not valid, err').send(res)
            }
            req.body.token = token
            return next()
        })
    }
}
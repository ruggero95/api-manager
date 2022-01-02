import { AccessTokenError } from "core/errorResponse";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export class AuthMiddleware{
    public static checkToken(req:Request, res:Response, next:NextFunction){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            throw(new AccessTokenError('Missing Access token'))
        }
        jwt.verify(token, process.env.ACCESS_TOKEN , function(err: jwt.VerifyErrors | null, payload: jwt.JwtPayload){
            if(!payload.username){
                throw(new AccessTokenError('Missing payload token'))
            }
            if(err){
                throw(new AccessTokenError('Token not valid'))
            }

            return next()
        })
    }
}
import { AuthFailureResponse, BadRequestResponse, SuccessResponse } from "./../../core/apiResponse"
import express, { NextFunction, Request, Response } from "express"
export const router  = express.Router()
import { AuthService } from "./auth.service"
import { AuthMiddleware } from "./auth.middleware"

router.post('/login', async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const username = req.body.username
        const password = req.body.password    
        if(!username || !password){
            return new BadRequestResponse('Dati login mancanti').send(res)
        }
        const token = await (new AuthService()).login(username, password)
        return new SuccessResponse('Login corretto',{token:token}).send(res)
    }catch(e){
        next(e)
    }   
    
})

router.post('/check-user', AuthMiddleware.checkToken, async (req:Request, res:Response,next:NextFunction)=>{
    try{
        //token checked inside middlewhare, if is not valid it will not enter the function.
        const token  = req.body.token
        if(!token){
            return new AuthFailureResponse('Token not valid').send(res)
        }
        const payload = await (new AuthService()).checkUser(token)
        if(payload){
            return new SuccessResponse('Token valid',{payload:payload}).send(res)
        }
        return new AuthFailureResponse('Token not valid').send(res)

    }catch(e){
        next(e)
    }
})

router.post('/logout', AuthMiddleware.checkToken, async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const token  = req.body.token
        if(!token){
            return new AuthFailureResponse('Token not valid').send(res)
        }
        const result = await (new AuthService()).logout(token)
        if(result){
            return new SuccessResponse('Logout successfuly').send(res)
        }
        return new BadRequestResponse('Logout failed').send(res)
    }catch(e){
        next(e)
    }
})
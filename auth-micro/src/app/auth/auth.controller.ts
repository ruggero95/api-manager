import { BadRequestResponse, SuccessResponse } from "./../../core/apiResponse"
import express, { NextFunction, Request, Response } from "express"
export const router  = express.Router()
import { AuthService } from "./auth.service"
import { AuthMiddleware } from "./auth.middleware"

router.post('/login', async (req:Request, res:Response, next:NextFunction)=>{
    try{
        console.log(req.originalUrl)
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
        //skip checking on db
        return new SuccessResponse('Token valido').send(res)
    }catch(e){
        next(e)
    }
})

router.post('/logout', AuthMiddleware.checkToken, (req:Request, res:Response, next:NextFunction)=>{
    try{
        const token = req.body.username

    }catch(e){
        next(e)
    }
})
import { logger, myStream } from "./core/logger";
import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import helmet from "helmet";
import { InternalErrorResponse, SuccessResponse } from "./core/apiResponse";
import { ErrorResponse, InternalError, NotFoundError } from "./core/errorResponse";
//import {DB} from './config/db'
import {DB} from './config/db'
import {router as mainRouter} from './app/index.controller'
export const app = express()
new DB().init()
app.use(morgan('tiny',{stream:myStream}))
app.use(helmet())
app.use(express.json())

app.get('/',(req:Request, res:Response, next: NextFunction)=>{
    return new SuccessResponse('Running').send(res)
})

//import api here
app.use(mainRouter)

app.use((req:Request, res:Response, next: NextFunction)=> next(new NotFoundError()));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorResponse) {
        ErrorResponse.handle(err, res)
    } else {
        if (process.env.NODE_ENV === 'development') {
            const error = err.stack ? err.stack : (err.message ? err.message : err.toString())
            logger.error(error);
            return new InternalErrorResponse(error).send(res)
        }
        ErrorResponse.handle(new InternalError(), res);
    }
})
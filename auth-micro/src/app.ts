import { myStream } from "./core/logger";
import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import helmet from "helmet";
import { SuccessResponse } from "./core/apiResponse";
import { ErrorResponse, NotFoundError } from "./core/errorResponse";
//import {DB} from './config/db'
import {DB} from './config/db'
import {router as mainRouter} from './app/index.controller'
import cors from "cors"
export const app = express()
const corsOptions = {
    origin:true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    exposeHeaders:['*','Content-Disposition']
}
new DB().init()
app.use(morgan('tiny',{stream:myStream}))
app.use(helmet())
app.use(express.json())
app.use(cors(corsOptions))
app.get('/',(req:Request, res:Response, next: NextFunction)=>{
    return new SuccessResponse('Running').send(res)
})

//import api here
app.use(mainRouter)

app.use((req:Request, res:Response, next: NextFunction)=> next(new NotFoundError()));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return ErrorResponse.handle(err, res)    
})
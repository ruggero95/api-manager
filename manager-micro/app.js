const express = require('express')
const bodyParser = require('body-parser');
const { successResponse, notFoundResponse, internalErrorResponse, badRequestResponse, errorResponse, unauthorizedResponse } = require('./config/response');
const cors = require('cors')
require('dotenv').config();
const mainRouter = require('./app/index.controller')
const app = express()

//const dbInit = require('./config/dbInit')
const db = require('./config/db')
//dbInit.init()
db.connection()
db.tables()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const corsOptions = {
    origin:true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    exposeHeaders:['*','Content-Disposition']
}

app.use(cors(corsOptions))

app.get('/',(req, res, next)=>{
    return successResponse(res, 'Running')
})
process.on('uncaughtException', (err) => {
    console.log('uncaught Exception')    
    const error = err.stack ? err.stack : (err.message ? err.message : err.toString())
    console.log(error)
});

app.use(mainRouter)

app.use((req, res, next)=> next(new Error('Not Found')));
app.use((err, req, res, next)=> {
    if(err && err.message && err.message=='Not Found'){
        return notFoundResponse(res)
    }
    if(err && err.message && err.message.toLowerCase().search('error response')!=-1 ){
        return errorResponse(res, err.message)
    }
    if(err && err.message && err.message.toLowerCase().search('unauthorized')!=-1){
        return unauthorizedResponse(res, err.message)
    }
    const error = err.stack ? err.stack : (err.message ? err.message : err.toString())
    return internalErrorResponse(res,error)
});


module.exports = app
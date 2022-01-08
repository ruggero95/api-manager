const express = require('express');
const { successResponse, errorResponse, badRequestResponse } = require('../../config/response');
const router = express.Router()
const requestService = require('./../requests/request.service');
const requestRepository = require('./request.repository');

router.get('/requests', async (req, res, next)=>{
    //api
    try{      
        const user_id = req.body.user_id //injected by middleware
        if(!user_id){
            return badRequestResponse(res,'Missing user id')
        }
        const requests = await requestRepository.getByUserId(user_id)
        if(requests && requests.rows ){
            return successResponse(res,'User requests',requests.rows)
        }
        return errorResponse(res, 'Error retriving news')
    }catch(e){
        next(e)
    }
})

router.get('/requests/bydate', async (req, res, next)=>{
    try{      
        const user_id = req.body.user_id //injected by middleware
        const start_date = req.query.start_date //injected by middleware
        const end_date = req.query.end_date //injected by middleware
        if(!user_id){
            return badRequestResponse(res,'Missing user id')
        }
        const requests = await requestService.getByDate(user_id, start_date, end_date)
        if(requests){
            return successResponse(res,'User requests',requests)
        }
        return errorResponse(res, 'Error retriving news')
    }catch(e){
        next(e)
    }
})

router.get('/requests/byDateSum', async (req, res, next)=>{
    try{      
        const user_id = req.body.user_id //injected by middleware
        const start_date = req.query.start_date
        const end_date = req.query.end_date 
        console.log(start_date)
        console.log(end_date)
        if(!user_id){
            return badRequestResponse(res,'Missing user id')
        }
        console.log(user_id)
        const requests = await requestService.getByDateSum(user_id, start_date, end_date)
        if(requests){
            return successResponse(res,'User requests',requests)
        }
        return errorResponse(res, 'Error retriving news')
    }catch(e){
        next(e)
    }
})


module.exports = router
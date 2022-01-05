const express = require('express');
const { successResponse, errorResponse } = require('../../config/response');
const newsMiddleware = require('./news.middleware');
const router = express.Router()
const requestService = require('./../requests/request.service')

router.get('/news', newsMiddleware.checkApikey, async (req, res, next)=>{
    //api
    try{
        const keywords =  req.query.q || '';
        const lang = req.query.lang || 'en'; // default: en
        const country = req.query.country || 'US'; // default: US
        const api_key = req.query.api_key || ''; // default: US

        const news = await requestService.processRequest(api_key, keywords,lang,country)
        if(news){
            return successResponse(res,'News',news)
        }
        return errorResponse(res, 'Error retriving news')
    }catch(e){
        next(e)
    }
})




module.exports = router
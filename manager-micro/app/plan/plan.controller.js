const express = require('express')
const router = express.Router()
const planRepository = require('./plan.repository')
const planService = require('./plan.service')
const {successResponse, errorResponse, badRequestResponse} = require('./../../config/response')
router.post('/add', async (req, res, next)=>{
    try{
        const user_id = req.body.user_id
        const name = req.body.name
        if(!user_id || !name){
            return badRequestResponse(res, 'Missing params')
        }
        const plan = await planService.addPlan(user_id,name)
        if(plan){
            return successResponse(res,'Plan created')
        }
        return errorResponse(res, 'Error creating plan')
    }catch(e){
        next(e)
    }
})



router.get('/key/:api_key', async (req, res, next)=>{
    try{
        const api_key = req.params.api_key
        if(!api_key){
            return badRequestResponse(res,'Missing apy key')
        }
        const { rows } = await planRepository.getByApiKey(api_key)
        if(rows && rows[0]){
            return successResponse(res, 'Plans', rows)
        }
        return errorResponse(res, 'Missing plans',null)
    }catch(e){
        next(e)
    }
})

router.get('/user', async (req, res, next)=>{
    try{
        const user_id = req.body.user_id  //iniettato da middlewhare
        if(!user_id){
            return badRequestResponse(res,'Missing user id')
        }
        const { rows } = await planRepository.getByUserID(user_id)
        if(rows && rows[0]){
            return successResponse(res, 'Plans', rows)
        }
        return errorResponse(res, 'Missing plans',null)
    }catch(e){
        next(e)
    }
})

module.exports = router
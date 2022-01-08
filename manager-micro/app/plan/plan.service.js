const planRepository = require('./plan.repository')
const generateApiKey = require('generate-api-key');
const requestRepository = require('./../requests/request.repository')
const planService = {
    addPlan: async (user_id, name, maxRequests = 500)=>{
        const api_key = generateApiKey({method:'string',prefix: 'plan',length:21})
        const {rows, rowCount} = await planRepository.create(user_id, name, maxRequests,api_key)
        return rowCount ? rowCount : null
    },
    deletePlan: async (plan_id)=>{
        await requestRepository.deleteByPlanId(plan_id)
        await planRepository.delete(plan_id)
        return true
    }
}


module.exports = planService
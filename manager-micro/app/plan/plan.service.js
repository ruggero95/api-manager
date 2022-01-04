const planRepository = require('./plan.repository')
const generateApiKey = require('generate-api-key');

const planService = {
    addPlan: async (user_id, name, maxRequests = 500)=>{
        const api_key = generateApiKey({method:'string',prefix: 'plan',length:21})
        const {rows, rowCount} = await planRepository.create(user_id, name, maxRequests,api_key)
        return rowCount ? rowCount : null
    }
}


module.exports = planService
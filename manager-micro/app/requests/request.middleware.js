const { unauthorizedResponse } = require("../../config/response")

const requestMiddleware = {
    checkApikey: (req, res, next) => {
        // Get the apy_key data
        const authHeader = req.headers['authorization']
        const api_key = authHeader && authHeader.split(' ')[1]
        if(!api_key){
            return unauthorizedResponse(res,'Missing apy_key')
        }
        //prima di passare al prossimo middleware aggiungo l api_key trovata
        req.query.api_key = api_key
        next()
    }
}

module.exports = requestMiddleware
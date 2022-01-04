const axios = require('axios')
const { unauthorizedResponse } = require('../../config/response')
const authApi = require('./auth.api')
const authMiddleware = {
    checkAuthToken: async (req, res, next) => {
        // Get the token data
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token){
            return unauthorizedResponse(res)
        }
        const checkToken = await authApi.checkToken(token)
        if(checkToken.error == 'true'){
            return unauthorizedResponse(res)
        }
        next()
    }
}

module.exports = authMiddleware
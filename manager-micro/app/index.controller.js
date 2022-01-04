const express = require('express')
const router = express.Router()
const planRouter = require('./plan/plan.controller')
const requestRouter = require('./requests/request.controller')
const authMiddleware = require('./auth/auth.middleware')
router.use('/plans', authMiddleware.checkAuthToken, planRouter)
router.use(requestRouter)

module.exports = router
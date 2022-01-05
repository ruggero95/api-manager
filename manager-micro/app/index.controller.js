const express = require('express')
const router = express.Router()
const planRouter = require('./plan/plan.controller')
const newsRouter = require('./news/news.controller')
const authMiddleware = require('./auth/auth.middleware')
const requestRouter = require('./requests/request.controller')

//check if user tokne is valid and inject user_id then pass to controller
router.use('/plans', authMiddleware.checkAuthToken, planRouter,requestRouter)

router.use(newsRouter)

module.exports = router
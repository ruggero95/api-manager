const express = require('express')
const router = express.Router()
const planRouter = require('./plan/plan.controller')

router.use('/plans',planRouter)

module.exports = router
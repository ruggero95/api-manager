import express from "express"
import { router as authRouter } from "./auth/auth.controller"
export const router = express.Router()


router.use('/auth',authRouter)
import express from 'express'
import { UserController } from '../controller/user-controller'

export const publicRouter = express.Router()

publicRouter.post('/api/login', UserController.login)
publicRouter.post('/api/users', UserController.register)
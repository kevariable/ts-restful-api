import express from 'express'
import { UserController } from '../controller/user-controller'
import {PingController} from "../controller/ping-controller";

export const publicRouter = express.Router()

publicRouter.get('/api/ping', PingController.ping)
publicRouter.post('/api/login', UserController.login)
publicRouter.post('/api/users', UserController.register)

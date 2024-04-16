import express from 'express'
import { UserController } from '../controller/user-controller'
import { user } from '../middleware/user'

export const apiRouter = express.Router()
apiRouter.use(user)

apiRouter.get('/api/users/current', UserController.currentUser)

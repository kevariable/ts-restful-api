import express from 'express'
import { UserController } from '../controller/user-controller'
import { user } from '../middleware/user'
import ContactController from '../controller/contact-controller'

export const apiRouter = express.Router()
apiRouter.use(user)

apiRouter.get('/api/users/current', UserController.currentUser)
apiRouter.patch('/api/users/current', UserController.updateUser)
apiRouter.post('/api/logout', UserController.logoutUser)

apiRouter.post('/api/contacts', ContactController.create)
apiRouter.get('/api/contacts/:contactId', ContactController.get)
apiRouter.put('/api/contacts/:contactId', ContactController.update)

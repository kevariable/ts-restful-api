import express from 'express'
import { UserController } from '../controller/user-controller'
import { user } from '../middleware/user'
import ContactController from '../controller/contact-controller'
import AddressController from '../controller/address-controller'

export const apiRouter = express.Router()
apiRouter.use(user)

apiRouter.get('/api/users/current', UserController.currentUser)
apiRouter.patch('/api/users/current', UserController.updateUser)
apiRouter.post('/api/logout', UserController.logoutUser)

apiRouter.post('/api/contacts', ContactController.create)
apiRouter.get('/api/contacts/:contactId', ContactController.get)
apiRouter.put('/api/contacts/:contactId', ContactController.update)
apiRouter.delete('/api/contacts/:contactId', ContactController.delete)
apiRouter.post('/api/contacts/search', ContactController.search)

apiRouter.post('/api/contacts/:contactId/addresses', AddressController.create)
apiRouter.get(
  '/api/contacts/:contactId/addresses/:addressId',
  AddressController.get
)
apiRouter.put(
  '/api/contacts/:contactId/addresses/:addressId',
  AddressController.update
)

apiRouter.delete(
  '/api/contacts/:contactId/addresses/:addressId',
  AddressController.delete
)

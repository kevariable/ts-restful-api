import { NextFunction, Response } from 'express'
import CreateAddress from '../action/address/create-address'
import UserRequest from '../request/user-request'
import { CreateAddressRequest, toAddressResponse } from '../model/address-model'

export default class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const data = req.body as CreateAddressRequest

      data.contact_id = BigInt(req.params.contactId)

      const response = await CreateAddress.execute(req.user!, data)

      res.json(toAddressResponse(response)).status(200)
    } catch (e: unknown) {
      next(e)
    }
  }
}

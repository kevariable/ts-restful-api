import { NextFunction, Response } from 'express'
import CreateAddress from '../action/address/create-address'
import UserRequest from '../request/user-request'
import {
  AddressResponse,
  CreateAddressRequest,
  toAddressResponse
} from '../model/address-model'
import GetAddress from '../action/address/get-address'
import UpdateAddress from '../action/address/update-address'
import DeleteAddress from '../action/address/delete-address'
import ListAddress from '../action/address/list-address'

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

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const addressId = BigInt(req.params.addressId)

      const contactId = BigInt(req.params.contactId)

      const response = await GetAddress.execute(req.user!, addressId, contactId)

      res.json(toAddressResponse(response)).status(200)
    } catch (e: unknown) {
      next(e)
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      let data = req.body

      data.contact_id = BigInt(req.params.contactId)

      data.id = BigInt(req.params.addressId)

      const address = await UpdateAddress.execute(req.user!, data)

      res.status(200).json(toAddressResponse(address))
    } catch (e: unknown) {
      next(e)
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const addressId = BigInt(req.params.addressId)

      const contactId = BigInt(req.params.contactId)

      const response = await DeleteAddress.execute(
        req.user!,
        addressId,
        contactId
      )

      res.json(toAddressResponse(response)).status(200)
    } catch (e: unknown) {
      next(e)
    }
  }

  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = BigInt(req.params.contactId)

      const addresses = await ListAddress.execute(req.user!, contactId)

      res.status(200).json(toAddressResponse(addresses))
    } catch (e: unknown) {
      next(e)
    }
  }
}

import { NextFunction, Response } from 'express'
import { UpdateContactRequest, toContactResponse } from '../model/contact-model'
import CreateContact from '../action/contact/create-contact'
import UserRequest from '../request/user-request'
import GetContact from '../action/contact/get-contact'
import UpdateContact from '../action/contact/update-contact'

export default class ContactController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await CreateContact.execute(req.user!, req.body)

      res.json(toContactResponse(response)).status(200)
    } catch (e: unknown) {
      next(e)
    }
  }

  static async get(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const contactId = BigInt(req.params.contactId)
      const response = await GetContact.execute(req.user!, contactId)

      res.json(toContactResponse(response)).status(200)
    } catch (e: unknown) {
      next(e)
    }
  }

  static async update(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body as UpdateContactRequest

      data.id = BigInt(req.params.contactId)

      const response = await UpdateContact.execute(req.user!, data)

      res.json(toContactResponse(response)).status(200)
    } catch (e: unknown) {
      next(e)
    }
  }
}

import { Address, User } from '@prisma/client'
import { CreateAddressRequest } from '../../model/address-model'
import { Validation } from '../../validation/validation'
import { AddressValidation } from '../../validation/address-validation'
import { prismaClient } from '../../application/database'
import GetContact from '../contact/get-contact'

export default class CreateAddress {
  static async execute(
    user: User,
    request: CreateAddressRequest
  ): Promise<Address> {
    const validated = Validation.validate(AddressValidation.CREATE, request)

    await GetContact.execute(user, request.contact_id)

    const createdAddress = await prismaClient.address.create({
      data: validated
    })

    return createdAddress
  }
}

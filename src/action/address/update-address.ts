import { Address, User } from '@prisma/client'
import { UpdateAddressRequest } from '../../model/address-model'
import GetAddress from './get-address'
import { prismaClient } from '../../application/database'
import { Validation } from '../../validation/validation'
import { AddressValidation } from '../../validation/address-validation'

export default class UpdateAddress {
  static async execute(
    user: User,
    data: UpdateAddressRequest
  ): Promise<Address> {
    const validated = Validation.validate<UpdateAddressRequest>(
      AddressValidation.UPDATE,
      data
    )

    const address = await GetAddress.execute(user, data.id, data.contact_id)

    const updatedAddress = await prismaClient.address.update({
      data: {
        street: validated.street || null,
        city: validated.city || null,
        province: validated.province || null,
        country: validated.country,
        postal_code: validated.postal_code
      },
      where: {
        id: address.id
      }
    })

    return updatedAddress
  }
}

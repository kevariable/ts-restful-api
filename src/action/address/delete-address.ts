import { Address, User } from '@prisma/client'
import GetAddress from './get-address'
import { prismaClient } from '../../application/database'

export default class DeleteAddress {
  static async execute(
    user: User,
    addressId: bigint,
    contactId: bigint
  ): Promise<Address> {
    const address = await GetAddress.execute(user, addressId, contactId)

    const deletedAddress = await prismaClient.address.delete({
      where: {
        id: address.id
      }
    })

    return deletedAddress
  }
}

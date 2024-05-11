import { Address, User } from '@prisma/client'
import { prismaClient } from '../../application/database'
import GetContact from '../contact/get-contact'

export default class ListAddress {
  static async execute(user: User, contactId: bigint): Promise<Address[]> {
    const contact = await GetContact.execute(user, contactId)

    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: contact.id
      }
    })

    return addresses
  }
}

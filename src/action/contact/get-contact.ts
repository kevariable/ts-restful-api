import { User } from '@prisma/client'
import { prismaClient } from '../../application/database'
import { ResponseError } from '../../error/response-error'

export default class GetContact {
  static async execute(user: User, contactId: bigint) {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: user.username
      }
    })

    if (!contact) {
      throw new ResponseError(404, `Contact ID: ${contactId} not found.`)
    }

    return contact
  }
}

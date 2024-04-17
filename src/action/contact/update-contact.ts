import { Contact, User } from '@prisma/client'
import { UpdateContactRequest } from '../../model/contact-model'
import { prismaClient } from '../../application/database'
import { Validation } from '../../validation/validation'
import { ContactValidation } from '../../validation/contact-validation'
import GetContact from './get-contact'

export default class UpdateContact {
  static async execute(
    user: User,
    request: UpdateContactRequest
  ): Promise<Contact> {
    const validated = Validation.validate(ContactValidation.UPDATE, request)

    const contact = await GetContact.execute(user, request.id)

    return await prismaClient.contact.update({
      where: {
        id: contact.id
      },
      data: validated
    })
  }
}

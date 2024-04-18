import { Contact, User } from '@prisma/client'
import { SearchContactRequest } from '../../model/contact-model'
import { prismaClient } from '../../application/database'
import { Pagination } from '../../model/page-model'
import { Validation } from '../../validation/validation'
import { ContactValidation } from '../../validation/contact-validation'

export default class SearchContact {
  static async execute(
    user: User,
    request: SearchContactRequest
  ): Promise<Pagination<Contact[]>> {
    const validated = Validation.validate(ContactValidation.SEARCH, request)

    const filters: {}[] = []

    if (validated.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: validated.name
            }
          },
          {
            last_name: {
              contains: validated.name
            }
          }
        ]
      })
    }

    if (validated.email) {
      filters.push({
        email: {
          contains: validated.email
        }
      })
    }

    if (validated.phone) {
      filters.push({
        phone: {
          contains: validated.phone
        }
      })
    }

    const query = {
      where: {
        username: user.username,
        AND: filters
      }
    }

    const contacts = await prismaClient.contact.findMany({
      ...query,

      skip: (validated.page - 1) * validated.size,

      take: validated.size
    })

    const totalContacts = await prismaClient.contact.count(query)

    return {
      data: contacts,
      page: {
        current_page: validated.page,
        size: validated.size,
        total_page: Math.ceil(totalContacts / validated.size)
      }
    }
  }
}

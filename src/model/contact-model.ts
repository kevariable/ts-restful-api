import { Contact } from '@prisma/client'
import { Response } from './model'

export type CreateContactRequest = {
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
}

export type UpdateContactRequest = CreateContactRequest & {
  id: bigint
}

export type ContactResponse = {
  id: bigint
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
}

export function toContactResponse({
  id,
  first_name,
  last_name,
  email,
  phone
}: Contact): Response<ContactResponse> {
  return {
    data: {
      id,
      first_name,
      last_name,
      email,
      phone
    }
  }
}

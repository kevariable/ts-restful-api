import { Contact } from '@prisma/client'
import { Response } from './model'
import { PageRequest, Pagination, isPagination } from './page-model'

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

export type SearchContactRequest = PageRequest & {
  name?: string | null
  email?: string | null
  phone?: string | null
}

export function toContactResponse(
  contacts: Contact | Pagination<Contact[]>
): Response<ContactResponse> | Pagination<ContactResponse[]> {
  const mapper = (contact: Contact) => ({
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone
  })

  if (isPagination<Contact | Contact[]>(contacts)) {
    return {
      ...contacts,
      data: contacts.data.map(mapper)
    }
  }

  return {
    data: mapper(contacts)
  }
}

export const isContactList = (
  contacts: Contact | Contact[]
): contacts is Contact[] => Array.isArray(contacts)

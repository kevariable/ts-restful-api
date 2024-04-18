import { faker } from '@faker-js/faker'
import { CreateContactRequest } from '../../src/model/contact-model'
import { User } from '@prisma/client'
import CreateContact from '../../src/action/contact/create-contact'

export const createContactRequest = (
  state?: Partial<CreateContactRequest>
): CreateContactRequest => ({
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  ...state
})

export const createContact = async (user: User) => {
  const request = createContactRequest()

  return await CreateContact.execute(user, request)
}

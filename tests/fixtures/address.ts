import { faker } from '@faker-js/faker'
import { CreateAddressRequest } from '../../src/model/address-model'
import { Contact, User } from '@prisma/client'
import CreateAddress from '../../src/action/address/create-address'

export const createAddressRequest = (
  contact: Contact,
  state?: Partial<CreateAddressRequest>
): CreateAddressRequest => ({
  contact_id: contact.id,
  street: faker.location.streetAddress(),
  city: faker.location.city(),
  province: faker.location.state(),
  country: faker.location.country(),
  postal_code: faker.location.zipCode(),
  ...state
})

export const createAddress = async (user: User, contact: Contact) => {
  const request = createAddressRequest(contact)

  return await CreateAddress.execute(user, request)
}

import supertest from 'supertest'
import { web } from '../src/application/web'
import { createContact } from './fixtures/contact'
import { createAddressRequest } from './fixtures/address'
import { createUser } from './fixtures/user'
import { AddressResponse } from '../src/model/address-model'
import { Response } from '../src/model/model'
import { faker } from '@faker-js/faker'

describe('POST /api/contacts/{:contactId}/addresses', () => {
  it('can create address by contact', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const request = createAddressRequest(contact)

    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('X-API-TOKEN', user.token!)
      .send(request)

    expect(response.status).toBe(200)

    const body: Response<AddressResponse> = response.body

    expect(body.data.id).not.toBeNull()
    expect(body.data.city).toBe(request.city)
    expect(body.data.province).toBe(request.province)
    expect(body.data.country).toBe(request.country)
    expect(body.data.postal_code).toBe(request.postal_code)
    expect(body.data.street).toBe(request.street)
  })

  it('can create address partial by contact', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const request = createAddressRequest(contact)

    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('X-API-TOKEN', user.token!)
      .send({
        street: request.street,
        country: request.country,
        postal_code: request.postal_code
      })

    expect(response.status).toBe(200)

    const body: Response<AddressResponse> = response.body

    expect(body.data.id).not.toBeNull()
    expect(body.data.city).toBeNull()
    expect(body.data.province).toBeNull()
    expect(body.data.street).toBe(request.street)
    expect(body.data.country).toBe(request.country)
    expect(body.data.postal_code).toBe(request.postal_code)
  })

  it('cant create address if payload is not desirable', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set('X-API-TOKEN', user.token!)
      .send({
        street: faker.word.words(50),
        country: faker.word.words(50),
        postal_code: faker.word.words(50),
        province: faker.word.words(50),
        city: faker.word.words(50)
      })

    expect(response.status).toBe(422)
  })

  it('can create address if contact not available', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const response = await supertest(web)
      .post(`/api/contacts/0/addresses`)
      .set('X-API-TOKEN', user.token!)
      .send(createAddressRequest(contact))

    expect(response.status).toBe(404)
  })
})

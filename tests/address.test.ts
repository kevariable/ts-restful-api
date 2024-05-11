import supertest from 'supertest'
import { web } from '../src/application/web'
import { createContact } from './fixtures/contact'
import { createAddress, createAddressRequest } from './fixtures/address'
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

describe('GET /api/contacts/:contactId/addresses/:addresId', () => {
  it('can get address', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const address = await createAddress(user, contact)

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', user.token!)
      .send()

    expect(response.status).toBe(200)

    const body: Response<AddressResponse> = response.body

    expect(BigInt(body.data.id)).toBe(address.id)
    expect(body.data.city).toBe(address.city)
    expect(body.data.province).toBe(address.province)
    expect(body.data.street).toBe(address.street)
    expect(body.data.country).toBe(address.country)
    expect(body.data.postal_code).toBe(address.postal_code)
  })

  it('cant get address by wrong contact', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const contact2nd = await createContact(user)

    const address = await createAddress(user, contact)

    const response = await supertest(web)
      .get(`/api/contacts/${contact2nd.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', user.token!)
      .send()

    expect(response.status).toBe(404)
  })

  it('cant get address by unknown address', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/0`)
      .set('X-API-TOKEN', user.token!)
      .send()

    expect(response.status).toBe(404)
  })
})

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
  it('can update address if payload desirable', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const address = await createAddress(user, contact)

    const request = createAddressRequest(contact)

    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', user.token!)
      .send(request)

    expect(response.status).toBe(200)

    const body: Response<AddressResponse> = response.body

    expect(BigInt(body.data.id)).toBe(address.id)
    expect(body.data.city).toBe(request.city)
    expect(body.data.province).toBe(request.province)
    expect(body.data.street).toBe(request.street)
    expect(body.data.country).toBe(request.country)
    expect(body.data.postal_code).toBe(request.postal_code)
  })

  it('can update address if payload desirable', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const address = await createAddress(user, contact)

    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
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

  it('can update address only required fields', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const address = await createAddress(user, contact)

    const request = createAddressRequest(contact)

    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', user.token!)
      .send({
        country: request.country,
        postal_code: request.postal_code
      })

    expect(response.status).toBe(200)

    const body: Response<AddressResponse> = response.body

    expect(BigInt(body.data.id)).toBe(address.id)
    expect(body.data.city).toBeNull()
    expect(body.data.province).toBeNull()
    expect(body.data.street).toBeNull()
    expect(body.data.country).toBe(request.country)
    expect(body.data.postal_code).toBe(request.postal_code)
  })
})

describe('DELETE: /api/contacts/:contactId/addresses/:addressId', () => {
  it('can delete contact with specific id', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const address = await createAddress(user, contact)

    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set('X-API-TOKEN', user.token!)
      .send()

    const body: Response<AddressResponse> = response.body

    expect(response.status).toBe(200)
    expect(BigInt(body.data.id)).toBe(address.id)
  })

  it('cant delete contact with incorrect id', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/0`)
      .set('X-API-TOKEN', user.token!)
      .send()

    expect(response.status).toBe(404)
  })
})

describe('GET /api/contacts/:contactId/addresses', () => {
  it('can get list of addresses by contact', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const [address1st, address2st, address3st] = await Promise.all([
      createAddress(user, contact),
      createAddress(user, contact),
      createAddress(user, contact)
    ])

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set('X-API-TOKEN', user.token!)
      .send()

    expect(response.status).toBe(200)

    const body: Response<AddressResponse[]> = response.body

    expect(body.data).toBeDefined()

    expect(body.data.length).toBe(3)

    const assertAddress = (actual, expected) => {
      expect(BigInt(actual.id)).toBe(expected.id)
      expect(actual.city).toBe(expected.city)
      expect(actual.province).toBe(expected.province)
      expect(actual.street).toBe(expected.street)
      expect(actual.country).toBe(expected.country)
      expect(actual.postal_code).toBe(expected.postal_code)
    }

    const address1stResponse = body.data.find(
      (address) => BigInt(address.id) === address1st.id
    )
    assertAddress(address1stResponse, address1st)

    const address2stResponse = body.data.find(
      (address) => BigInt(address.id) === address2st.id
    )
    assertAddress(address2stResponse, address2st)

    const address3stResponse = body.data.find(
      (address) => BigInt(address.id) === address3st.id
    )
    assertAddress(address3stResponse, address3st)
  })

  it('cant get list of addresses by wrong contact', async () => {
    const user = await createUser()

    const response = await supertest(web)
      .get(`/api/contacts/0/addresses`)
      .set('X-API-TOKEN', user.token!)
      .send()

    expect(response.status).toBe(404)
  })
})

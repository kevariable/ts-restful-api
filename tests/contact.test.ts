import supertest from 'supertest'
import { createUser } from './fixtures/user'
import { web } from '../src/application/web'
import { createContact, createContactRequest } from './fixtures/contact'
import { ContactResponse } from '../src/model/contact-model'
import { Response } from '../src/model/model'
import { faker } from '@faker-js/faker'
import CreateContact from '../src/action/contact/create-contact'
import { Pagination } from '../src/model/page-model'
import { Contact } from '@prisma/client'

describe('POST /api/contacts', () => {
  it('can create contact if payload is desirable', async () => {
    const user = await createUser()

    const request = createContactRequest()

    const response = await supertest(web)
      .post('/api/contacts')
      .send(request)
      .set('X-API-TOKEN', user.token!)

    const body: Response<ContactResponse> = response.body

    expect(response.status).toBe(200)
    expect(body.data.first_name).toBe(request.first_name)
    expect(body.data.last_name).toBe(request.last_name)
    expect(body.data.email).toBe(request.email)
    expect(body.data.phone).toBe(request.phone)
  })

  it('cant create contact if payload is not satisfiable', async () => {
    const user = await createUser()

    const response = await supertest(web)
      .post('/api/contacts')
      .send({
        first_name: faker.lorem.words(50),
        last_name: faker.lorem.words(50),
        email: faker.lorem.words(50),
        phone: faker.lorem.words(50)
      })
      .set('X-API-TOKEN', user.token!)

    expect(response.status).toBe(422)
  })

  it('cant create contact only first name', async () => {
    const user = await createUser()

    const request = {
      first_name: faker.person.firstName()
    }

    const response = await supertest(web)
      .post('/api/contacts')
      .send(request)
      .set('X-API-TOKEN', user.token!)

    const body: Response<ContactResponse> = response.body

    expect(response.status).toBe(200)
    expect(body.data.first_name).toBe(request.first_name)
    expect(body.data.last_name).toBeNull()
    expect(body.data.email).toBeNull()
    expect(body.data.phone).toBeNull()
  })
})

describe('GET /api/contacts/:contactId', () => {
  it('can get contact', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .send()
      .set('X-API-TOKEN', user.token!)

    const body: Response<ContactResponse> = response.body

    expect(response.status).toBe(200)
    expect(BigInt(body.data.id)).toBe(contact.id)
    expect(body.data.first_name).toBe(contact.first_name)
    expect(body.data.last_name).toBe(contact.last_name)
    expect(body.data.email).toBe(contact.email)
    expect(body.data.phone).toBe(contact.phone)
  })

  it('cant get contact if wrong contact id', async () => {
    const user = await createUser()

    const response = await supertest(web)
      .get(`/api/contacts/0`)
      .send()
      .set('X-API-TOKEN', user.token!)

    expect(response.status).toBe(404)
  })
})

describe('PUT /api/contacts/:contactId', () => {
  it('can update contact if payload desirable', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const request = createContactRequest()

    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .send(request)
      .set('X-API-TOKEN', user.token!)

    const body: Response<ContactResponse> = response.body

    expect(response.status).toBe(200)
    expect(BigInt(body.data.id)).toBe(contact.id)
    expect(body.data.first_name).toBe(request.first_name)
    expect(body.data.last_name).toBe(request.last_name)
    expect(body.data.email).toBe(request.email)
    expect(body.data.phone).toBe(request.phone)
  })

  it('cant update contact if payload is not desirable', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .send({
        first_name: faker.lorem.words(50),
        last_name: faker.lorem.words(50),
        email: faker.lorem.words(50),
        phone: faker.lorem.words(50)
      })
      .set('X-API-TOKEN', user.token!)

    expect(response.status).toBe(422)
  })
})

describe('DELETE: /api/contacts/:contactId', () => {
  it('can delete contact with specific id', async () => {
    const user = await createUser()

    const contact = await createContact(user)

    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', user.token!)
      .send()

    const body: Response<ContactResponse> = response.body

    expect(response.status).toBe(200)
    expect(BigInt(body.data.id)).toBe(contact.id)
    expect(body.data.first_name).toBe(contact.first_name)
    expect(body.data.last_name).toBe(contact.last_name)
    expect(body.data.email).toBe(contact.email)
    expect(body.data.phone).toBe(contact.phone)
  })

  it('cant delete contact with incorrect id', async () => {
    const user = await createUser()

    const response = await supertest(web)
      .delete('/api/contacts/0')
      .set('X-API-TOKEN', user.token!)
      .send()

    expect(response.status).toBe(404)
  })
})

describe('GET /api/contacts/search', () => {
  it('can search and get all data without any params', async () => {
    const user = await createUser()

    await Promise.all([
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest())
    ])

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send({
        page: 1,
        size: 10
      })

    const body: Pagination<Response<Contact[]>> = response.body

    expect(body.page.total_page).toBe(1)
    expect(body.page.current_page).toBe(1)
    expect(body.page.size).toBe(10)
  })

  it('can search with pagination', async () => {
    const user = await createUser()

    await Promise.all([
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest())
    ])

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send({
        page: 1,
        size: 2
      })

    const body: Pagination<Contact[]> = response.body

    expect(body.page.total_page).toBe(3)
    expect(body.page.current_page).toBe(1)
    expect(body.page.size).toBe(2)
  })

  it('can search with pagination with next page', async () => {
    const user = await createUser()

    await Promise.all([
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest())
    ])

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send({
        page: 3,
        size: 2
      })

    const body: Pagination<Contact[]> = response.body

    expect(body.data.length).toBe(1)
    expect(body.page.total_page).toBe(3)
    expect(body.page.current_page).toBe(3)
    expect(body.page.size).toBe(2)
  })

  it('can search with pagination with query params of name', async () => {
    const user = await createUser()

    await Promise.all([
      CreateContact.execute(user, createContactRequest({ first_name: 'Kevin' })),
      CreateContact.execute(user, createContactRequest({ last_name: 'Kevin' })),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest())
    ])

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send({
        page: 1,
        size: 5,
        name: 'Kevin'
      })

    const body: Pagination<Contact[]> = response.body

    expect(body.data.length).toBe(2)
    expect(body.page.total_page).toBe(1)
    expect(body.page.current_page).toBe(1)
    expect(body.page.size).toBe(5)
  })

  it('can search with pagination with query params of phone', async () => {
    const user = await createUser()

    await Promise.all([
      CreateContact.execute(user, createContactRequest({ phone: '+60' })),
      CreateContact.execute(user, createContactRequest({ phone: '+60' })),
      CreateContact.execute(user, createContactRequest({ phone: '+60' })),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest())
    ])

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send({
        page: 1,
        size: 5,
        phone: '+60'
      })

    const body: Pagination<Contact[]> = response.body

    expect(body.data.length).toBe(3)
    expect(body.page.total_page).toBe(1)
    expect(body.page.current_page).toBe(1)
    expect(body.page.size).toBe(5)
  })

  it('can search with pagination with query params of email', async () => {
    const user = await createUser()

    await Promise.all([
      CreateContact.execute(user, createContactRequest({ email: 'kevariable@gmail.com' })),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest()),
      CreateContact.execute(user, createContactRequest())
    ])

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send({
        page: 1,
        size: 5,
        email: 'kevariable@gmail.com'
      })

    const body: Pagination<Contact[]> = response.body

    expect(body.data.length).toBe(1)
    expect(body.page.total_page).toBe(1)
    expect(body.page.current_page).toBe(1)
    expect(body.page.size).toBe(5)
  })

  it('can search with pagination with query params of name, email and phone', async () => {
    const user = await createUser()

    await Promise.all([
      CreateContact.execute(user, createContactRequest({ email: 'kevariable@gmail.com' })),
      CreateContact.execute(user, createContactRequest({ email: 'kevariable@gmail.com', first_name: 'Kevin' })),
      CreateContact.execute(user, createContactRequest({ email: 'kevariable@gmail.com', last_name: 'Kevin' })),
      CreateContact.execute(user, createContactRequest({ email: 'kevariable@gmail.com', last_name: 'Kevin', phone: '+60' })),
      CreateContact.execute(user, createContactRequest())
    ])

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send({
        page: 1,
        size: 5,
        email: 'kevariable@gmail.com',
        name: 'Kevin',
        phone: '+60'
      })

    const body: Pagination<Contact[]> = response.body

    expect(body.data.length).toBe(1)
    expect(body.page.total_page).toBe(1)
    expect(body.page.current_page).toBe(1)
    expect(body.page.size).toBe(5)
  })

  it('cant search if payload is not satisfiable', async () => {
    const user = await createUser()

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send()

    expect(response.status).toBe(422)
  })

  it('cant search get any data when is not matches', async () => {
    const user = await createUser()

    await Promise.all([
      CreateContact.execute(user, createContactRequest({ first_name: 'Kevin' })),
      CreateContact.execute(user, createContactRequest({ first_name: 'Kevin' })),
      CreateContact.execute(user, createContactRequest({ first_name: 'Kevin' })),
      CreateContact.execute(user, createContactRequest({ first_name: 'Kevin' })),
      CreateContact.execute(user, createContactRequest({ first_name: 'Kevin' })),
    ])

    const response = await supertest(web)
      .post('/api/contacts/search')
      .set('X-API-TOKEN', user.token!)
      .send({
        page: 1,
        size: 5,
        name: 'I AM ANOTHER KEVIN THAT DOES NOT EXISTS IN OR DB !'
      })

    const body: Pagination<Contact[]> = response.body

    expect(body.data.length).toBe(0)
    expect(body.page.total_page).toBe(0)
    expect(body.page.current_page).toBe(1)
    expect(body.page.size).toBe(5)
  })
})

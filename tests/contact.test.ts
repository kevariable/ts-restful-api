import supertest from "supertest"
import { createUser } from "./fixtures/user"
import { web } from '../src/application/web'
import { createContact, createContactRequest } from "./fixtures/contact"
import { ContactResponse } from "../src/model/contact-model"
import { Response } from "../src/model/model"
import { faker } from "@faker-js/faker"

describe('POST /api/contacts', () => {
    it('can create contact if payload is desirable', async () => {
        const user = await createUser()

        const request = createContactRequest()

        const response = await supertest(web)
            .post('/api/contacts')
            .send(request)
            .set('X-API-TOKEN', user.token !)

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
                phone: faker.lorem.words(50),
            })
            .set('X-API-TOKEN', user.token !)

        expect(response.status).toBe(422)
    })

    it('cant create contact only first name', async () => {
        const user = await createUser()

        const request = {
            first_name: faker.person.firstName(),
        }

        const response = await supertest(web)
            .post('/api/contacts')
            .send(request)
            .set('X-API-TOKEN', user.token !)

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
            .set('X-API-TOKEN', user.token !)

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
            .set('X-API-TOKEN', user.token !)

        expect(response.status).toBe(404)
    })
})
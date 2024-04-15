import supertest from "supertest"
import { web } from '../src/application/web'
import { faker } from '@faker-js/faker'
import { logger } from "../src/application/logger"

describe('POST /api/users', () => {
    it('should reject register new user if desired payload not satisfiable', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                name: '',
                password: '',
            })

        logger.debug(response.body)

        expect(response.status).toBe(422)
        expect(response.body.errors).toBeDefined()
    })

    it('should reject register new user if desired payload exceeds limit of string', async () => {
        const options = { min: 50, max: 50 }

        const  request = {
            username: faker.lorem.words(options),
            name: faker.lorem.words(options),
            password: faker.lorem.words(options),
        }

        console.log(`Req:`, request)

        const response = await supertest(web)
            .post('/api/users')
            .send(request)

        logger.debug(response.body)

        expect(response.status).toBe(422)
        expect(response.body.errors).toBeDefined()
    })
    
    it ('can register the new user if desired payload is satisfiable', async () => {
        const request = {
            username: faker.internet.userName(),    
            name: faker.person.fullName(),
            password: faker.internet.password()
        }

        const response = await supertest(web)
            .post('/api/users')
            .send(request)

        logger.debug(response.body)

        expect(response.status).toBe(201)

        expect(response.body).toEqual({
            data: {
                username: request.username,
                name: request.name
            }
        })
    })
})
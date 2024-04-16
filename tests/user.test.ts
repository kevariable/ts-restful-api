import supertest from "supertest"
import { web } from '../src/application/web'
import { faker } from '@faker-js/faker'
import CreateUser from "../src/actions/create-user"

describe('POST /api/users', () => {
    it('should reject register new user if desired payload not satisfiable', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                name: '',
                password: '',
            })

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

        expect(response.status).toBe(201)

        expect(response.body).toEqual({
            data: {
                username: request.username,
                name: request.name,
                token: null
            }
        })
    })

    it('can get a token from login when username and password is correct', async () => {
        const userRequest = {
            username: faker.internet.userName(),    
            name: faker.person.fullName(),
            password: faker.internet.password()
        }

        const user = await CreateUser.execute(userRequest)

        const response = await supertest(web)
            .post('/api/login')
            .send({
                username: user.username,
                password: userRequest.password
            })

        expect(response.status).toBe(200)
        expect(response.body.data).toBeDefined()
        expect(response.body.data.token).toBeDefined()
        expect(response.body.data.token).not.toBeNull()
        expect(response.body.data.name).toBe(userRequest.name)
        expect(response.body.data.username).toBe(userRequest.username)
    })

    it('cant login when username and password is incorrect', async () => {
        const response = await supertest(web)
            .post('/api/login')
            .send({
                username: 'I AM THE WRONG USERNAME',
                password: 'I AM THE WRONG PASSWORD'
            })

        expect(response.status).toBe(401)
    })

    it('cant login when password is incorrect', async () => {
        const userRequest = {
            username: faker.internet.userName(),    
            name: faker.person.fullName(),
            password: faker.internet.password()
        }

        const user = await CreateUser.execute(userRequest)

        const response = await supertest(web)
            .post('/api/login')
            .send({
                username: user.username,
                password: 'I AM THE WRONG PASSWORD'
            })

        expect(response.status).toBe(401)
    })
})
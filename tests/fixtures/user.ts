import { faker } from "@faker-js/faker"
import { CreateUserRequest } from "../../src/model/user-model"

export const createUserRequest = (): CreateUserRequest => {
    return {
        username: faker.internet.userName(),    
        name: faker.person.fullName(),
        password: faker.internet.password()
    }
}
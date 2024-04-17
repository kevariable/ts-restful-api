import { faker } from '@faker-js/faker'
import { CreateUserRequest } from '../../src/model/user-model'
import { User } from '@prisma/client'
import CreateUser from '../../src/action/user/create-user'
import LoginUser from '../../src/action/user/login-user'

export const createUserRequest = (): CreateUserRequest => {
  return {
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    password: faker.internet.password()
  }
}

export const createUser = async (): Promise<User> => {
  const request = createUserRequest()

  await CreateUser.execute(request)

  return await LoginUser.execute(request)
}
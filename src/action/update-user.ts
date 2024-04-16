import { User } from '@prisma/client'
import { UpdateUserRequest } from '../model/user-model'
import { Validation } from '../validation/validation'
import { UserValidation } from '../validation/user-validation'
import bcrypt from 'bcrypt'
import { prismaClient } from '../application/database'

export default class UpdateUser {
  static async execute(user: User, request: UpdateUserRequest): Promise<User> {
    Validation.validate(UserValidation.UPDATE, request)

    let data: UpdateUserRequest = {}

    if (request.name) {
      data.name = request.name
    }

    if (request.password) {
      data.password = (await bcrypt.hash(request.password, 10)).toString()
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        username: user.username
      },

      data
    })

    return updatedUser
  }
}

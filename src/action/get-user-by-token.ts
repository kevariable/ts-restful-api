import { User } from '@prisma/client'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import {
  GetUserByTokenRequest,
  UserResponse,
  toUserResponse
} from '../model/user-model'

export default class GetUserByToken {
  static async execute(request: GetUserByTokenRequest): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        token: request.token
      }
    })

    if (!user) {
      throw new ResponseError(401, 'Invalid user token.')
    }

    return user
  }
}

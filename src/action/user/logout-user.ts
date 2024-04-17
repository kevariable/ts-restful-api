import { User } from '@prisma/client'
import { prismaClient } from '../../application/database'

export default class LogoutUser {
  static async execute(user: User): Promise<User> {
    const updatedUser = await prismaClient.user.update({
      where: {
        username: user.username
      },
      data: {
        token: null
      }
    })

    return updatedUser
  }
}

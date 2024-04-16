import { LoginUserRequest, UserResponse, toUserResponse } from "../model/user-model"
import { UserValidation } from "../validation/user-validation"
import { Validation } from "../validation/validation"
import { prismaClient } from "../application/database"
import { ResponseError } from "../error/response-error"
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { User } from "@prisma/client"

export default class LoginUser {
    static async execute(request: LoginUserRequest): Promise<User> {
        Validation.validate(UserValidation.LOGIN, request)

        const user = await prismaClient.user.findUnique({
            where: {
                username: request.username
            }
        })

        if (! user) {
            throw new ResponseError(401, 'Username or password incorrect.')
        }

        const passwordEquals = await bcrypt.compare(request.password, user.password)

        if (! passwordEquals) {
            throw new ResponseError(401, 'Username or password incorrect.')
        }

        const updatedUser = await prismaClient.user.update({
            where: {
                username: request.username
            },
            data: {
                token: uuidv4()
            }
        })

        return updatedUser
    }
}
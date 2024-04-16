import { CreateUserRequest, toUserResponse, UserResponse} from "../model/user-model"
import { Validation } from "../validation/validation"
import { UserValidation } from "../validation/user-validation"
import { prismaClient } from "../application/database"
import { ResponseError } from "../error/response-error"
import bcrypt from 'bcrypt'
import { User } from "@prisma/client"

export default class CreateUser {
    static async execute(request: CreateUserRequest): Promise<User> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)

        const record = await prismaClient.user.findUnique({
            where: {
                username: registerRequest.username
            },
            select: {
                username: true
            }
        })

        if (record) {
            throw new ResponseError(400, 'Username already exists')
        }

        registerRequest.password = (await bcrypt.hash(registerRequest.password, 10)).toString()

        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return user
    }
}
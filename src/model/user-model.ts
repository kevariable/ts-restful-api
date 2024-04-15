import { User } from '@prisma/client'

export type UserResponse = {
    username: string
    name: string
    token?: string
}

export type CreateUserRequest = {
    username: string
    name: string
    password: string
}

export function toUserResponse({ username, name }: User): UserResponse {
    return {
        name,
        username,
    }
}
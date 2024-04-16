import { User } from '@prisma/client'

export type UserResponse = {
  username: string
  name: string
  token?: string | null
}

export type CreateUserRequest = {
  username: string
  name: string
  password: string
}

export type LoginUserRequest = {
  username: string
  password: string
}

export type GetUserByTokenRequest = {
  token: string
}

export type UpdateUserRequest = {
  name?: string
  password?: string
}

export function toUserResponse({ username, name, token }: User): UserResponse {
  return {
    name,
    username,
    token
  }
}

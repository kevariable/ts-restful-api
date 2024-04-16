import { NextFunction, Request, Response } from 'express'
import CreateUser from '../action/create-user'
import LoginUser from '../action/login-user'
import { toUserResponse } from '../model/user-model'
import UserRequest from '../request/user-request'
import UpdateUser from '../action/update-user'

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CreateUser.execute(req.body)

      res.status(201).json({
        data: toUserResponse(response)
      })
    } catch (e: unknown) {
      next(e)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await LoginUser.execute(req.body)

      res.status(200).json({
        data: toUserResponse(response)
      })
    } catch (e: unknown) {
      next(e)
    }
  }

  static async currentUser(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(200).json({
        data: toUserResponse(req.user!)
      })
    } catch (e: unknown) {
      next(e)
    }
  }

  static async updateUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = await UpdateUser.execute(req.user !, req.body)

      res.status(200).json({
        data: toUserResponse(user)
      })
    } catch (e: unknown) {
      next(e)
    }
  }
}

import { NextFunction, Request, Response } from 'express'
import CreateUser from '../action/user/create-user'
import LoginUser from '../action/user/login-user'
import { toUserResponse } from '../model/user-model'
import UserRequest from '../request/user-request'
import UpdateUser from '../action/user/update-user'
import LogoutUser from '../action/user/logout-user'

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CreateUser.execute(req.body)

      res.status(201).json(toUserResponse(response))
    } catch (e: unknown) {
      next(e)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await LoginUser.execute(req.body)

      res.status(200).json(toUserResponse(response))
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
      res.status(200).json(toUserResponse(req.user!))
    } catch (e: unknown) {
      next(e)
    }
  }

  static async updateUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = await UpdateUser.execute(req.user!, req.body)

      res.status(200).json(toUserResponse(user))
    } catch (e: unknown) {
      next(e)
    }
  }

  static async logoutUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await LogoutUser.execute(req.user!)

      res.json(toUserResponse(response)).status(200)
    } catch (e: unknown) {
      next(e)
    }
  }
}

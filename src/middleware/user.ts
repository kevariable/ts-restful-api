import { NextFunction, Response } from 'express'
import UserRequest from '../request/user-request'
import GetUser from '../action/user/get-user-by-token'

export const user = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await GetUser.execute({ token: req.get('X-API-TOKEN')! })

    req.user = user

    next()
  } catch (e: unknown) {
    res.status(401).json({
      errors: 'Unauthorized user.'
    })
  }
}

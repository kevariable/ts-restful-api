import { NextFunction, Request, Response } from 'express'
import CreateUser from "../actions/create-user"
import LoginUser from "../actions/login-user"

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await CreateUser.execute(req.body)

            res.status(201).json({
                data: response
            })
        } catch (e: unknown) {
            next(e)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await LoginUser.execute(req.body)

            res.status(200).json({
                data: response
            })
        } catch (e: unknown) {
            next(e)
        }
    }
}
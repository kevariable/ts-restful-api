import { NextFunction, Request, Response } from 'express'
import {UserService} from "../service/user-service"

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.register(req.body)

            res.status(201).json({
                data: response
            })
        } catch (e: unknown) {
            next(e)
        }
    }
}
import { NextFunction, Request, Response } from 'express'

export class PingController {
    static async ping(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({
            success: true
        })
    }
}
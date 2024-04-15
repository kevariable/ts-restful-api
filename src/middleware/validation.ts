import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        return res.status(422).json({
            errors: `Validation Error: ${JSON.stringify(err)}`
        })
    }

    if (err instanceof ResponseError) {
        return res.status(err.status).json({
            errors: err.message,
        })
    }

    return res.status(500).json({
        errors: err.message
    })
}
import { NextFunction, Response } from "express";
import { toContactResponse } from "../model/contact-model";
import CreateContact from "../action/contact/create-contact";
import UserRequest from "../request/user-request";

export default class ContactController {
    static async create(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await CreateContact.execute(req.user !, req.body)

            res.json(toContactResponse(response)).status(200)
        } catch (e: unknown) {
            next(e)
        }
    }
}
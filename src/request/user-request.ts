import { User } from "@prisma/client";
import { Request } from "express";

export default interface UserRequest extends Request {
    user?: User
}
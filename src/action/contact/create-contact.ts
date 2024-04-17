import { User } from "@prisma/client";
import { CreateContactRequest } from "../../model/contact-model";
import { prismaClient } from "../../application/database";
import { Validation } from "../../validation/validation";
import { ContactValidation } from "../../validation/contact-validation";

export default class CreateContact {
    static async execute(user: User, request: CreateContactRequest) {
        const validated = Validation.validate(ContactValidation.CREATE, request)

        const createdContact = await prismaClient.contact.create({
            data: {
                username: user.username,
                email: validated.email,
                first_name: validated.first_name,
                last_name: validated.last_name,
                phone: validated.phone
            }
        })

        return createdContact
    }
}
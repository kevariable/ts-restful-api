import { Contact } from "@prisma/client";
import { Response } from "./model";

export type CreateContactRequest = {
    first_name: string
    last_name: string | null
    email: string | null
    phone: string | null
}

export type ContactResponse = {
    id: number | bigint
    first_name: string 
    last_name: string | null
    email: string | null
    phone: string | null
}

export function toContactResponse({ id, first_name, last_name, email, phone }: Contact): Response<ContactResponse> {
    return {
        data: {
            id,
            first_name,
            last_name,
            email,
            phone,
        }
    }
}
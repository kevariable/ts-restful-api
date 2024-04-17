import { User } from "@prisma/client";
import GetContact from "./get-contact";
import { prismaClient } from "../../application/database";

export default class DeleteContact {
    static async execute(user: User, contactId: bigint) {
        const contact = await GetContact.execute(user, contactId)

        const deletedContact = await prismaClient.contact.delete({
            where: {
                id: contact.id
            }
        })

        return deletedContact
    }
}
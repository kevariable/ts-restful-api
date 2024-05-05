import { Address, User } from "@prisma/client";
import { prismaClient } from "../../application/database";
import GetContact from "../contact/get-contact";
import { ResponseError } from "../../error/response-error";

export default class GetAddress {
    static async execute(user: User, addressId: bigint, contactId: bigint): Promise<Address> {
        const contact = await GetContact.execute(user, contactId)

        const address = await prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contact.id,
            }
        })

        if (! address) {
            throw new ResponseError(404, `Address by ID: ${addressId} not found`)
        }

        return address
    }
}
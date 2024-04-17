import { faker } from "@faker-js/faker";
import { CreateContactRequest } from "../../src/model/contact-model";

export const createContactRequest = (): CreateContactRequest => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
})
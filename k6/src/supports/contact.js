import http from "k6/http";
import {check} from "k6";
import {Counter} from "k6/metrics";

const createContactCounter = new Counter('create_contact_counter_success')
const createContactCounterError = new Counter('create_contact_counter_err')

export const createContact = (createContactRequest, token) => {
    const createContact = http.post('http://app:3000/api/contacts', createContactRequest, {
        headers: {
            'X-API-TOKEN': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const createContactResponse = createContact.json()

    check(createContact, {
        'response must be 200': () => {
            const passed = createContact.status === 200

            if (passed) {
                createContactCounter.add(1)
            } else {
                createContactCounterError.add(1)
            }

            return passed
        },
        'response contains id': createContactResponse.data?.id !== undefined,
    })
}
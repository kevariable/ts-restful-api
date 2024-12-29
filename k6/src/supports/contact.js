import http from "k6/http";
import {check} from "k6";

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
        'response must be 200': createContact.status === 200,
        'response contains id': createContactResponse.data.id !== undefined,
    })
}
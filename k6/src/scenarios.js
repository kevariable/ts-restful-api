import { createContact } from './supports/contact.js'
import {createUser, loginUser} from "./supports/user.js";
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { vu } from 'k6/execution'

export const options = {
    scenarios: {
        createContacts: {
            exec: 'createContacts',
            executor: 'shared-iterations',
            vus: 20,
            iterations: 200,
            maxDuration: '15s',
        },

        userRegistration: {
            exec: 'userRegistration',
            executor: 'constant-vus',
            vus: 20,
            duration: '15s',
        },
    },
};

export const createContacts = () => {
    const username = `kevin${(vu.idInInstance % 9) + 1}`
    const loginRequest = JSON.stringify({
        username,
        password: 'password'
    })

    createContact(JSON.stringify({
        first_name: 'Contact',
        last_name: `No 1`,
        email: `contact1@example.com`,
        phone: '+01'
    }), loginUser(loginRequest).token)
}

export const userRegistration = () => {
    const uniqueId = uuidv4()

    const request = JSON.stringify({
        username: uniqueId,
        password: 'password',
        name: uniqueId
    })

    createUser(request)
}
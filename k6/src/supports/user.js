import http from "k6/http";
import {check, fail} from "k6";

export function loginUser(loginUserRequest){
    const login = http.post('http://app:3000/api/login', loginUserRequest, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const { data: response = {} } = login.json()

    const checkLogin = check(login, {
        'login response must be 200': login.status === 200,
        'login token response must be exists': response.token !== undefined
    })

    if (!checkLogin) {
        fail(`Login failed user ${loginUserRequest}`)
    }

    return response
}

export function createUser(data) {
    const userRegistered = http.post('http://app:3000/api/users', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const userRegisteredResponse = userRegistered.json()

    const userRegisteredCheck = check(userRegistered, {
        'Register response status must 201': userRegistered.status === 201,
        'Register response data must not null': userRegisteredResponse.data !== null ,
    })

    if (! userRegisteredCheck) {
        fail(`Failed to registering ${data}`)
    }

    return userRegisteredResponse
}
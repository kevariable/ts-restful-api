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
        fail(`Login failed user ${username}`)
    }

    return response
}
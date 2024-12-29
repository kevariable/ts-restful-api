import http from 'k6/http';
import {check, fail} from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import {createUser} from "./supports/user.js";

export const options = {
  vus: 10,
  duration: '10s',
};

const currentUserCallback = (data, { uniqueId }) => {
  const currentUser = http.get('http://app:3000/api/users/current', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-TOKEN': data.token
    }
  });

  const currentUserResponse = currentUser.json()

  const currentUserCheck = check(currentUser, {
    'Current user response status must 200': currentUser.status === 200,
    'Current user response data must not null': currentUserResponse.data !== null ,
  })

  if (! currentUserCheck) {
    fail(`Failed to get current user-${uniqueId}`)
  }

  return currentUserResponse
}

const loginCallback = (data, { uniqueId, password }) => {
  const loginRequest = JSON.stringify({
    username: data?.username || '',
    password,
  })

  const login = http.post('http://app:3000/api/login', loginRequest, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const loginResponse = login.json()

  const loginCheck = check(login, {
    'Login response status must 200': login.status === 200,
    'Login response token must not null': (loginResponse.data?.token || null) !== null ,
  })

  if (! loginCheck) {
    fail(`Failed to get user-${uniqueId}`)
  }

  return loginResponse
}

const registerCallback = ({ uniqueId, password }) => {
  const data = JSON.stringify({
    username: `user-${uniqueId}`,
    password,
    name: `user-${uniqueId}`
  })

  return createUser(data)
}

export default function() {
  const uniqueId = uuidv4()
  const password = 'password'

  const registerResponse = registerCallback({ uniqueId, password })

  const loginResponse = loginCallback(registerResponse.data, { uniqueId, password })

  return currentUserCallback(loginResponse.data, { uniqueId })
}

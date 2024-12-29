import { vu } from 'k6/execution'
import {loginUser} from "./supports/user.js";
import {createContact} from "./supports/contact.js";

export const options = {
  vus: 10,
  duration: '30s'
}

export function setup() {
  const data = []

  for (let i = 0; i < 10; i++) {
    data.push({
      first_name: 'Contact',
      last_name: `No ${i}`,
      email: `contact${i}@example.com`,
      phone: `+${i}`
    })
  }

  return data
}

const getToken = () => {
  const username = `kevin${vu.idInInstance}`
  const loginRequest = JSON.stringify({
    username,
    password: 'password'
  })


  return loginUser(loginRequest)
}

export default function (data) {
  const { token } = getToken()

  for (const value of data) {
    createContact(JSON.stringify(value), token)
  }
}

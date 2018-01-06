import axios from 'axios'
import Cookies from 'universal-cookie'
import { merge } from 'lodash'

import { API_URL } from '../_constants'

const cookies = new Cookies()

export class UserService {
  static login (username, password) {
    const config = {
      auth: {
        username,
        password
      }
    }

    return axios
      .post(`${API_URL}/auth`, {}, config)
      .then(response => {
        const user = merge(response.data.user, { token: response.data.token })
        cookies.set('user', user)
        return Promise.resolve(user)
      })
      .catch(err => Promise.reject(err.response))
  }

  static logout () {
    cookies.remove('user')
  }
}

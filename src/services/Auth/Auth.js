import axios from 'axios'

class Auth {
  static Login (username, password) {
    return axios
      .post('http://0.0.0.0:9000/auth', {}, {
        auth: {
          username, password
        }
      })
  }
}

export default Auth

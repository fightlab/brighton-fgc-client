import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const requestLogin = creds => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

const receiveLogin = data => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: data.token,
    user: data.user
  }
}

const loginError = err => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    status: err.status,
    statusText: err.statusText
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export const loginUser = creds => {
  let config = {
    auth: {
      username: creds.email,
      password: creds.password
    }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return axios.post('http://0.0.0.0:9000/auth', {}, config)
      .then(response => {
        cookies.set('token', response.data.token)
        dispatch(receiveLogin(response.data))
      })
      .catch(err => {
        dispatch(loginError(err.response))
      })
  }
}

export const logoutUser = () => dispatch => {
  dispatch(requestLogout())
  cookies.remove('token')
  dispatch(receiveLogout())
}

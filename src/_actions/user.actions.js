import { userConstants } from '../_constants'
import { UserService, AuthService } from '../_services'

const auth = new AuthService()

const login = creds => dispatch => {
  const request = creds => {
    return {
      type: userConstants.LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false,
      creds
    }
  }

  const success = user => {
    return {
      type: userConstants.LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      user
    }
  }

  const failure = error => {
    return {
      type: userConstants.LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ creds }))

  UserService.login(creds.email, creds.password)
    .then(user => dispatch(success(user)))
    .catch(error => dispatch(failure(error)))
}

const logout = () => {
  UserService.logout()
  return {
    type: userConstants.LOGOUT,
    isFetching: false,
    isAuthenticated: false
  }
}

const newLogin = () => dispatch => {
  const request = () => {
    return {
      type: userConstants.LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false
    }
  }

  dispatch(request())
  auth.login()
}

const handleAuth = history => dispatch => {
  const request = () => {
    return {
      type: userConstants.LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false
    }
  }
  const success = authResult => {
    return {
      type: userConstants.LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      authResult
    }
  }

  const failure = error => {
    return {
      type: userConstants.LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      error
    }
  }

  dispatch(request())

  auth
    .handleAuthentication(history)
    .then(authResult => dispatch(success(authResult)))
    .catch(error => dispatch(failure(error)))
}

export const userActions = {
  login,
  logout,
  newLogin,
  handleAuth
}

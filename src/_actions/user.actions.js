import { userConstants } from '../_constants'
import { AuthService } from '../_services'

const auth = new AuthService()

const login = () => dispatch => {
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

const logout = history => dispatch => {
  const success = () => ({
    type: userConstants.LOGOUT,
    isAuthenticated: false
  })

  dispatch(success())
  auth.logout(history)
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

const checkIfAuthenticated = () => dispatch => {
  const success = isAuthenticated => ({
    type: userConstants.ISAUTHENTICATED_SUCCESS,
    isFetching: false,
    isAuthenticated
  })

  dispatch(success(auth.isAuthenticated()))
}

export const userActions = {
  logout,
  login,
  handleAuth,
  checkIfAuthenticated
}

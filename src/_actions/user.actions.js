import { userConstants } from '../_constants'
import { UserService } from '../_services'

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

export const userActions = {
  login,
  logout
}

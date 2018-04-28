import { userConstants } from '../_constants'
import { AuthService, PlayerService } from '../_services'

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
      isAuthenticated: false,
      isAdmin: false,
      authResult: null,
      profile: null
    }
  }

  const success = ({ authResult, profile, isAdmin }) => {
    return {
      type: userConstants.LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      authResult,
      profile,
      isAdmin
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

const checkIfAdmin = () => async dispatch => {
  const success = isAdmin => ({
    type: userConstants.ISADMIN_SUCCESS,
    isFetching: false,
    isAdmin
  })

  dispatch(success(await auth.isAdmin()))
}

const getProfile = () => dispatch => {
  const request = () => {
    return {
      type: userConstants.GETPROFILE_REQUEST,
      isFetching: true,
      isAuthenticated: false
    }
  }

  const success = profile => {
    return {
      type: userConstants.GETPROFILE_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      profile
    }
  }

  const failure = error => {
    return {
      type: userConstants.GETPROFILE_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      error
    }
  }

  dispatch(request())

  auth
    .getProfile()
    .then(profile => dispatch(success(profile)))
    .catch(error => dispatch(failure(error)))
}

const getPlayer = () => dispatch => {
  const request = () => ({
    type: userConstants.GETPLAYER_REQUEST,
    isFetching: true,
    player: null
  })

  const success = player => ({
    type: userConstants.GETPLAYER_SUCCESS,
    isFetching: false,
    player
  })

  const failure = error => ({
    type: userConstants.GETPLAYER_FAILURE,
    isFetching: false,
    error
  })

  dispatch(request())

  // check if authenticated
  const { access_token: token = '' } = auth.isAuthenticated()

  PlayerService
    .me(token)
    .then(player => dispatch(success(player)))
    .catch(error => dispatch(failure(error)))
}

export const userActions = {
  logout,
  login,
  handleAuth,
  checkIfAuthenticated,
  getProfile,
  checkIfAdmin,
  getPlayer
}

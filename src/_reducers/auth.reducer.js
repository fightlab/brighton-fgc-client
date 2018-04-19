import { merge } from 'lodash'

import { userConstants } from '../_constants'

const init = {
  isFetching: false,
  isAuthenticated: false,
  user: null
}

export const auth = (state = init, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return merge({}, state, {
        isFetching: true,
        isAuthenticated: false,
        creds: action.creds
      })
    case userConstants.LOGIN_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      })
    case userConstants.LOGIN_FAILURE:
      return merge({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        user: null
      })
    case userConstants.ISAUTHENTICATED_SUCCESS:
      return merge({}, state, {
        isAuthenticated: action.isAuthenticated
      })
    case userConstants.LOGOUT:
      return merge({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: null
      })
    default:
      return state
  }
}

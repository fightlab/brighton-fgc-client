import { merge } from 'lodash'

import { eventConstants } from '../_constants'

const init = {
  isFetching: false,
  events: []
}

export const event = (state = init, action) => {
  switch (action.type) {
    case eventConstants.GETALL_REQUEST:
      return merge({}, state, {
        isFetching: true
      })
    case eventConstants.GETALL_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        events: action.events
      })
    case eventConstants.GETALL_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        events: []
      })
    default:
      return state
  }
}

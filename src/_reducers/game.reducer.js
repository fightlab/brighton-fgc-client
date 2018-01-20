import { merge } from 'lodash'

import { gameConstants } from '../_constants'

const init = {
  isFetching: false,
  games: []
}

export const game = (state = init, action) => {
  switch (action.type) {
    case gameConstants.GETALL_REQUEST:
      return merge({}, state, {
        isFetching: true
      })
    case gameConstants.GETALL_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        games: action.games
      })
    case gameConstants.GETALL_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        games: []
      })
    default:
      return state
  }
}

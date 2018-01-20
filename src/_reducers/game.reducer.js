import { merge } from 'lodash'

import { gameConstants } from '../_constants'

const init = {
  isFetching: false,
  games: [],
  game: null
}

export const game = (state = init, action) => {
  switch (action.type) {
    case gameConstants.GETALL_REQUEST:
    case gameConstants.GET_REQUEST:
    case gameConstants.GETTOURNAMENTS_REQUEST:
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
    case gameConstants.GET_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        game: action.game
      })
    case gameConstants.GET_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        game: null
      })
    case gameConstants.GETTOURNAMENTS_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        tournaments: action.tournaments
      })
    case gameConstants.GETTOURNAMENTS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        tournaments: []
      })
    default:
      return state
  }
}

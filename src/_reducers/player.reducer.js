import { merge } from 'lodash'

import { playerConstants } from '../_constants'

const init = {
  isFetching: false,
  players: [],
  player: {},
  statistics: {}
}

export const player = (state = init, action) => {
  switch (action.type) {
    case playerConstants.GETALL_REQUEST:
      state.players = []
      return merge({}, state, {
        isFetching: true,
        players: action.players
      })
    case playerConstants.GETALL_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        players: action.players
      })
    case playerConstants.GETALL_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        players: action.players
      })
    case playerConstants.GETSTATISTICS_REQUEST:
      state.statistics = {}
      return merge({}, state, {
        isFetching: true,
        statistics: action.statistics
      })
    case playerConstants.GETSTATISTICS_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        statistics: action.statistics
      })
    case playerConstants.GETSTATISTICS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        statistics: action.statistics
      })
    case playerConstants.GET_REQUEST:
      state.player = {}
      return merge({}, state, {
        isFetching: true,
        player: action.player
      })
    case playerConstants.GET_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        player: action.player
      })
    case playerConstants.GET_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        player: action.player
      })
    default:
      return state
  }
}
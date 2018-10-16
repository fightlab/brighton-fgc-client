import merge from 'lodash/merge'

import { playerConstants } from '../_constants'

const init = {
  isFetching: false,
  players: [],
  player: {},
  statistics: {},
  headToHead: {}
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
    case playerConstants.GETOPPONENTS_REQUEST:
      state.opponents = []
      return merge({}, state, {
        isFetching: true
      })
    case playerConstants.GETOPPONENTS_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        opponents: action.opponents
      })
    case playerConstants.GETOPPONENTS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status
      })
    case playerConstants.GETSTATISTICSH2H_REQUEST:
      state.headToHead = {}
      return merge({}, state, {
        isFetching: true
      })
    case playerConstants.GETSTATISTICSH2H_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        headToHead: action.headToHead
      })
    case playerConstants.GETSTATISTICSH2H_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status
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
    case playerConstants.GETELO_REQUEST:
      state.elo = []
      return merge({}, state, {
        isFetching: true,
        elo: action.elo
      })
    case playerConstants.GETELO_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        elo: action.elo
      })
    case playerConstants.GETELO_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        elo: action.elo
      })
    default:
      return state
  }
}

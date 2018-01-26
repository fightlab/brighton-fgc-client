import { merge } from 'lodash'

import { tournamentConstants } from '../_constants'

const init = {
  isFetching: false,
  tournaments: [],
  tournament: null,
  standings: []
}

export const tournament = (state = init, action) => {
  switch (action.type) {
    case tournamentConstants.GETALL_REQUEST:
      state.tournaments = []
      return merge({}, state, {
        isFetching: true,
        tournaments: action.tournaments
      })
    case tournamentConstants.GETSTANDINGS_REQUEST:
      state.standings = []
      return merge({}, state, {
        isFetching: true,
        standings: action.standings
      })
    case tournamentConstants.GET_REQUEST:
      state.tournament = {}
      return merge({}, state, {
        isFetching: true,
        tournament: action.tournament
      })
    case tournamentConstants.GETALL_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        tournaments: action.tournaments
      })
    case tournamentConstants.GETALL_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        tournaments: action.tournaments
      })
    case tournamentConstants.GETSTANDINGS_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        standings: action.standings
      })
    case tournamentConstants.GETSTANDINGS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        standings: action.standings
      })
    case tournamentConstants.GET_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        tournament: action.tournament
      })
    case tournamentConstants.GET_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        tournament: action.tournament
      })
    default:
      return state
  }
}

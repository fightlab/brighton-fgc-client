import merge from 'lodash/merge'

import { tournamentConstants } from '../_constants'

const init = {
  isFetching: false,
  tournaments: [],
  tournament: null,
  standings: [],
  matches: [],
  count: 0
}

export const tournament = (state = init, action) => {
  switch (action.type) {
    case tournamentConstants.GETALL_REQUEST:
      state.tournaments = []
      return merge({}, state, {
        isFetching: true,
        tournaments: action.tournaments
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
    case tournamentConstants.GETSTANDINGS_REQUEST:
      state.standings = []
      return merge({}, state, {
        isFetching: true,
        standings: action.standings
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
    case tournamentConstants.GETMATCHES_REQUEST:
      state.matches = []
      return merge({}, state, {
        isFetching: true,
        matches: action.matches
      })
    case tournamentConstants.GETMATCHES_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        matches: action.matches
      })
    case tournamentConstants.GETMATCHES_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        matches: action.matches
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
    case tournamentConstants.GETCOUNT_REQUEST:
      return merge({}, state, {
        isFetching: true,
        count: 0
      })
    case tournamentConstants.GETCOUNT_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        count: action.count
      })
    case tournamentConstants.GETCOUNT_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        count: 0
      })
    default:
      return state
  }
}

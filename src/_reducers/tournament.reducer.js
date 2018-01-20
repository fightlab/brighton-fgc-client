import { merge } from 'lodash'

import { tournamentConstants } from '../_constants'

const init = {
  isFetching: false,
  tournaments: [],
  tournament: null
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

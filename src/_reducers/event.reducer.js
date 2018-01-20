import { merge } from 'lodash'

import { eventConstants } from '../_constants'

const init = {
  isFetching: false,
  events: [],
  event: null,
  tournaments: []
}

export const event = (state = init, action) => {
  switch (action.type) {
    case eventConstants.GETALL_REQUEST:
      state.events = []
      return merge({}, state, {
        isFetching: true,
        events: action.events
      })
    case eventConstants.GET_REQUEST:
      return merge({}, state, {
        isFetching: true,
        event: action.event
      })
    case eventConstants.GETTOURNAMENTS_REQUEST:
      state.tournaments = []
      return merge({}, state, {
        isFetching: true,
        tournaments: action.tournaments
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
        events: action.events
      })
    case eventConstants.GET_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        event: action.event
      })
    case eventConstants.GET_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        event: action.event
      })
    case eventConstants.GETTOURNAMENTS_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        tournaments: action.tournaments
      })
    case eventConstants.GETTOURNAMENTS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        tournaments: action.tournaments
      })
    default:
      return state
  }
}

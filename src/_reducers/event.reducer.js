import merge from 'lodash/merge'

import { eventConstants } from '../_constants'

const init = {
  isFetching: false,
  events: [],
  event: null,
  tournaments: [],
  count: 0
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
    case eventConstants.GETCOUNT_REQUEST:
      return merge({}, state, {
        isFetching: true,
        count: 0
      })
    case eventConstants.GETCOUNT_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        count: action.count
      })
    case eventConstants.GETCOUNT_FAILURE:
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

import { merge } from 'lodash'

import { seriesConstans } from '../_constants'

const init = {
  isFetching: false,
  standings: [],
  series: [],
  _series: {}
}

export const series = (state = init, action) => {
  switch (action.type) {
    case seriesConstans.GETSTANDINGS_REQUEST:
      state.standings = []
      return merge({}, state, {
        isFetching: true,
        standings: action.standings
      })
    case seriesConstans.GETSTANDINGS_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        standings: action.standings
      })
    case seriesConstans.GETSTANDINGS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        standings: action.standings
      })
    case seriesConstans.GETALL_REQUEST:
      state.series = []
      return merge({}, state, {
        isFetching: true,
        series: action.series
      })
    case seriesConstans.GETALL_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        series: action.series
      })
    case seriesConstans.GETALL_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        series: action.series
      })
    case seriesConstans.GET_REQUEST:
      state._series = {}
      return merge({}, state, {
        isFetching: true,
        _series: action._series
      })
    case seriesConstans.GET_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        _series: action._series
      })
    case seriesConstans.GET_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        _series: action._series
      })
    default:
      return state
  }
}
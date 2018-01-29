import { merge } from 'lodash'

import { seriesConstans } from '../_constants'

const init = {
  isFetching: false,
  standings: []
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
    default:
      return state
  }
}

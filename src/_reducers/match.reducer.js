import merge from 'lodash/merge'

import { matchConstants } from '../_constants'

const init = {
  count: 0,
  countGames: 0,
  matches: []
}

export const match = (state = init, action) => {
  switch (action.type) {
    case matchConstants.GETCOUNT_REQUEST:
      return merge({}, state, {
        isFetching: true,
        count: 0
      })
    case matchConstants.GETCOUNT_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        count: action.count
      })
    case matchConstants.GETCOUNT_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        count: 0
      })
    case matchConstants.GETCOUNTGAMES_REQUEST:
      return merge({}, state, {
        isFetching: true,
        countGames: 0
      })
    case matchConstants.GETCOUNTGAMES_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        countGames: action.countGames
      })
    case matchConstants.GETCOUNTGAMES_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        countGames: 0
      })
    case matchConstants.GETMATCHESYOUTUBE_REQUEST:
      return merge({}, state, {
        isFetching: true,
        matches: []
      })
    case matchConstants.GETMATCHESYOUTUBE_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        matches: action.matches
      })
    case matchConstants.GETMATCHESYOUTUBE_FAILURE:
      return merge({}, state, {
        isFetching: false,
        errorMessage: action.statusText,
        errorCode: action.status,
        matches: []
      })
    default:
      return state
  }
}

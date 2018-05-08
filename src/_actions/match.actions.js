import { matchConstants } from '../_constants'
import { MatchService } from '../_services'

const getCount = () => dispatch => {
  const request = () => ({
    type: matchConstants.GETCOUNT_REQUEST,
    isFetching: true,
    count: 0
  })

  const success = count => ({
    type: matchConstants.GETCOUNT_SUCCESS,
    isFetching: false,
    count
  })

  const failure = error => {
    return {
      type: matchConstants.GETCOUNT_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      count: 0
    }
  }

  dispatch(request())

  MatchService
    .count()
    .then(count => dispatch(success(count)))
    .catch(error => dispatch(failure(error)))
}

const getCountGames = () => dispatch => {
  const request = () => ({
    type: matchConstants.GETCOUNTGAMES_REQUEST,
    isFetching: true,
    countGames: 0
  })

  const success = countGames => ({
    type: matchConstants.GETCOUNTGAMES_SUCCESS,
    isFetching: false,
    countGames
  })

  const failure = error => {
    return {
      type: matchConstants.GETCOUNTGAMES_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      countGames: 0
    }
  }

  dispatch(request())

  MatchService
    .countGames()
    .then(countGames => dispatch(success(countGames)))
    .catch(error => dispatch(failure(error)))
}

export const matchActions = {
  getCount,
  getCountGames
}

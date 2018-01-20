import { gameConstants } from '../_constants'
import { GameService } from '../_services'

const getAll = limit => dispatch => {
  const request = limit => {
    return {
      type: gameConstants.GETALL_REQUEST,
      isFetching: true,
      limit
    }
  }

  const success = games => {
    return {
      type: gameConstants.GETALL_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      games
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GETALL_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ limit }))

  GameService
    .getAll(limit)
    .then(games => dispatch(success(games)))
    .catch(error => dispatch(failure(error)))
}

export const gameActions = {
  getAll
}

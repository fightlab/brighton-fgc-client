import { playerConstants } from '../_constants'
import { PlayerService } from '../_services'

const getAll = (all, limit) => dispatch => {
  const request = (all, limit) => {
    return {
      type: playerConstants.GETALL_REQUEST,
      isFetching: true,
      limit,
      all
    }
  }

  const success = players => {
    return {
      type: playerConstants.GETALL_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      players
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GETALL_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ all, limit }))

  PlayerService
    .getAll(all, limit)
    .then(players => dispatch(success(players)))
    .catch(error => dispatch(failure(error)))
}

export const playerActions = {
  getAll
}

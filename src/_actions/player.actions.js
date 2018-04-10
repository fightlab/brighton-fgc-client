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

const get = id => dispatch => {
  const request = id => {
    return {
      type: playerConstants.GET_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = player => {
    return {
      type: playerConstants.GET_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      player
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GET_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  PlayerService
    .get(id)
    .then(players => dispatch(success(players)))
    .catch(error => dispatch(failure(error)))
}

const getStatistics = id => dispatch => {
  const request = id => {
    return {
      type: playerConstants.GETSTATISTICS_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = statistics => {
    return {
      type: playerConstants.GETSTATISTICS_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      statistics
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GETSTATISTICS_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  PlayerService
    .getStatistics(id)
    .then(players => dispatch(success(players)))
    .catch(error => dispatch(failure(error)))
}

export const playerActions = {
  getAll,
  get,
  getStatistics
}

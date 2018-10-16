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
      players
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GETALL_FAILURE,
      isFetching: false,
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
      player
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GET_FAILURE,
      isFetching: false,
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
      statistics
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GETSTATISTICS_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  PlayerService
    .getStatistics(id)
    .then(statistics => dispatch(success(statistics)))
    .catch(error => dispatch(failure(error)))
}

const getOpponents = id => dispatch => {
  const request = id => {
    return {
      type: playerConstants.GETOPPONENTS_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = opponents => {
    return {
      type: playerConstants.GETOPPONENTS_SUCCESS,
      isFetching: false,
      opponents
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GETOPPONENTS_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  PlayerService
    .getOpponents(id)
    .then(opponents => dispatch(success(opponents)))
    .catch(error => dispatch(failure(error)))
}

const getStatisticsHeadToHead = (p1id, p2id) => dispatch => {
  const request = (p1id, p2id) => {
    return {
      type: playerConstants.GETSTATISTICSH2H_REQUEST,
      isFetching: true,
      p1id,
      p2id
    }
  }

  const success = headToHead => {
    return {
      type: playerConstants.GETSTATISTICSH2H_SUCCESS,
      isFetching: false,
      headToHead
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GETSTATISTICSH2H_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ p1id, p2id }))

  PlayerService
    .getHeadToHead(p1id, p2id)
    .then(headToHead => dispatch(success(headToHead)))
    .catch(error => dispatch(failure(error)))
}

const getElo = id => dispatch => {
  const request = id => {
    return {
      type: playerConstants.GETELO_REQUEST,
      isFetching: true,
      id,
      elo: []
    }
  }

  const success = elo => {
    return {
      type: playerConstants.GETELO_SUCCESS,
      isFetching: false,
      elo
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GETELO_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      elo: []
    }
  }

  dispatch(request({ id }))

  PlayerService
    .getElo(id)
    .then(elo => dispatch(success(elo)))
    .catch(error => dispatch(failure(error)))
}

const getGameResults = (id, gameId) => dispatch => {
  const request = (id, gameId) => {
    return {
      type: playerConstants.GETGAMERESULTS_REQUEST,
      isFetching: true,
      id,
      gameId,
      results: []
    }
  }

  const success = results => {
    return {
      type: playerConstants.GETGAMERESULTS_SUCCESS,
      isFetching: false,
      results
    }
  }

  const failure = error => {
    return {
      type: playerConstants.GETGAMERESULTS_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      results: []
    }
  }

  dispatch(request({ id }))

  PlayerService
    .getGameResults(id, gameId)
    .then(results => dispatch(success(results)))
    .catch(error => dispatch(failure(error)))
}

export const playerActions = {
  getAll,
  get,
  getStatistics,
  getStatisticsHeadToHead,
  getOpponents,
  getElo,
  getGameResults
}

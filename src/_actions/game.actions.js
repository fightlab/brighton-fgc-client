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

const get = id => dispatch => {
  const request = id => {
    return {
      type: gameConstants.GET_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = game => {
    return {
      type: gameConstants.GET_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      game
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GET_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText,
      game: null
    }
  }

  dispatch(request({ id }))

  GameService
    .get(id)
    .then(game => dispatch(success(game)))
    .catch(error => dispatch(failure(error)))
}

const getTournaments = id => dispatch => {
  const request = id => {
    return {
      type: gameConstants.GETTOURNAMENTS_REQUEST,
      isFetching: true,
      id,
      tournaments: []
    }
  }

  const success = tournaments => {
    return {
      type: gameConstants.GETTOURNAMENTS_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      tournaments
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GETTOURNAMENTS_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText,
      tournaments: []
    }
  }

  dispatch(request({ id }))

  GameService
    .getTournaments(id)
    .then(tournaments => dispatch(success(tournaments)))
    .catch(error => dispatch(failure(error)))
}

const getStandings = id => dispatch => {
  const request = id => {
    return {
      type: gameConstants.GETSTANDINGS_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = standings => {
    return {
      type: gameConstants.GETSTANDINGS_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      standings
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GETSTANDINGS_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  GameService
    .getStandings(id)
    .then(tournaments => dispatch(success(tournaments)))
    .catch(error => dispatch(failure(error)))
}

export const gameActions = {
  getAll,
  get,
  getTournaments,
  getStandings
}

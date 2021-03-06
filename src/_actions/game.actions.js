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
      games
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GETALL_FAILURE,
      isFetching: false,
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
      game
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GET_FAILURE,
      isFetching: false,
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
      tournaments
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GETTOURNAMENTS_FAILURE,
      isFetching: false,
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
      standings
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GETSTANDINGS_FAILURE,
      isFetching: false,
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

const getElo = id => dispatch => {
  const request = id => {
    return {
      type: gameConstants.GETELO_REQUEST,
      isFetching: true,
      id,
      elo: []
    }
  }

  const success = elo => {
    return {
      type: gameConstants.GETELO_SUCCESS,
      isFetching: false,
      elo
    }
  }

  const failure = error => {
    return {
      type: gameConstants.GETELO_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      elo: []
    }
  }

  dispatch(request({ id }))

  GameService
    .getElo(id)
    .then(elo => dispatch(success(elo)))
    .catch(error => dispatch(failure(error)))
}

export const gameActions = {
  getAll,
  get,
  getTournaments,
  getStandings,
  getElo
}

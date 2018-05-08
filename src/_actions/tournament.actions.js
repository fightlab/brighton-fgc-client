import { tournamentConstants } from '../_constants'
import { TournamentService } from '../_services'

const getAll = limit => dispatch => {
  const request = limit => {
    return {
      type: tournamentConstants.GETALL_REQUEST,
      isFetching: true,
      limit
    }
  }

  const success = tournaments => {
    return {
      type: tournamentConstants.GETALL_SUCCESS,
      isFetching: false,
      tournaments
    }
  }

  const failure = error => {
    return {
      type: tournamentConstants.GETALL_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ limit }))

  TournamentService
    .getAll(limit)
    .then(tournaments => dispatch(success(tournaments)))
    .catch(error => dispatch(failure(error)))
}

const getStandings = id => dispatch => {
  const request = id => {
    return {
      type: tournamentConstants.GETSTANDINGS_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = standings => {
    return {
      type: tournamentConstants.GETSTANDINGS_SUCCESS,
      isFetching: false,
      standings
    }
  }

  const failure = error => {
    return {
      type: tournamentConstants.GETSTANDINGS_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  TournamentService
    .getStandings(id)
    .then(tournaments => dispatch(success(tournaments)))
    .catch(error => dispatch(failure(error)))
}

const get = id => dispatch => {
  const request = id => {
    return {
      type: tournamentConstants.GET_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = tournament => {
    return {
      type: tournamentConstants.GET_SUCCESS,
      isFetching: false,
      tournament
    }
  }

  const failure = error => {
    return {
      type: tournamentConstants.GET_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      tournament: null
    }
  }

  dispatch(request({ id }))

  TournamentService
    .get(id)
    .then(tournament => dispatch(success(tournament)))
    .catch(error => dispatch(failure(error)))
}

const getCount = () => dispatch => {
  const request = () => ({
    type: tournamentConstants.GETCOUNT_REQUEST,
    isFetching: true,
    count: 0
  })

  const success = count => ({
    type: tournamentConstants.GETCOUNT_SUCCESS,
    isFetching: false,
    count
  })

  const failure = error => {
    return {
      type: tournamentConstants.GETCOUNT_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      count: 0
    }
  }

  dispatch(request())

  TournamentService
    .count()
    .then(count => dispatch(success(count)))
    .catch(error => dispatch(failure(error)))
}

export const tournamentActions = {
  getAll,
  get,
  getStandings,
  getCount
}

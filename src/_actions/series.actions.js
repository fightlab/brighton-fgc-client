import { seriesConstans } from '../_constants'
import { SeriesService } from '../_services'

const getStandings = (id, limit) => dispatch => {
  const request = id => {
    return {
      type: seriesConstans.GETSTANDINGS_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = standings => {
    return {
      type: seriesConstans.GETSTANDINGS_SUCCESS,
      isFetching: false,
      standings
    }
  }

  const failure = error => {
    return {
      type: seriesConstans.GETSTANDINGS_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  SeriesService
    .getStandings(id, limit)
    .then(series => dispatch(success(series)))
    .catch(error => dispatch(failure(error)))
}

const getTournaments = (id, limit) => dispatch => {
  const request = id => {
    return {
      type: seriesConstans.GETTOURNAMENTS_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = tournaments => {
    return {
      type: seriesConstans.GETTOURNAMENTS_SUCCESS,
      isFetching: false,
      tournaments
    }
  }

  const failure = error => {
    return {
      type: seriesConstans.GETTOURNAMENTS_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  SeriesService
    .getTournaments(id, limit)
    .then(series => dispatch(success(series)))
    .catch(error => dispatch(failure(error)))
}

const getAll = (id, limit) => dispatch => {
  const request = id => {
    return {
      type: seriesConstans.GETALL_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = series => {
    return {
      type: seriesConstans.GETALL_SUCCESS,
      isFetching: false,
      series
    }
  }

  const failure = error => {
    return {
      type: seriesConstans.GETALL_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  SeriesService
    .getAll()
    .then(series => dispatch(success(series)))
    .catch(error => dispatch(failure(error)))
}

const get = (id) => dispatch => {
  const request = id => {
    return {
      type: seriesConstans.GET_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = series => {
    return {
      type: seriesConstans.GET_SUCCESS,
      isFetching: false,
      _series: series
    }
  }

  const failure = error => {
    return {
      type: seriesConstans.GET_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  SeriesService
    .get(id)
    .then(series => dispatch(success(series)))
    .catch(error => dispatch(failure(error)))
}

export const seriesActions = {
  getStandings,
  getAll,
  get,
  getTournaments
}

import { eventConstants } from '../_constants'
import { EventService } from '../_services'

const getAll = limit => dispatch => {
  const request = limit => {
    return {
      type: eventConstants.GETALL_REQUEST,
      isFetching: true,
      limit
    }
  }

  const success = events => {
    return {
      type: eventConstants.GETALL_SUCCESS,
      isFetching: false,
      events
    }
  }

  const failure = error => {
    return {
      type: eventConstants.GETALL_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ limit }))

  EventService
    .getAll(limit)
    .then(events => dispatch(success(events)))
    .catch(error => dispatch(failure(error)))
}

const get = id => dispatch => {
  const request = id => {
    return {
      type: eventConstants.GET_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = event => {
    return {
      type: eventConstants.GET_SUCCESS,
      isFetching: false,
      event
    }
  }

  const failure = error => {
    return {
      type: eventConstants.GET_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      event: null
    }
  }

  dispatch(request({ id }))

  EventService
    .get(id)
    .then(event => dispatch(success(event)))
    .catch(error => dispatch(failure(error)))
}

const getTournaments = id => dispatch => {
  const request = id => {
    return {
      type: eventConstants.GETTOURNAMENTS_REQUEST,
      isFetching: true,
      id
    }
  }

  const success = tournaments => {
    return {
      type: eventConstants.GETTOURNAMENTS_SUCCESS,
      isFetching: false,
      tournaments
    }
  }

  const failure = error => {
    return {
      type: eventConstants.GETTOURNAMENTS_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      tournaments: []
    }
  }

  dispatch(request({ id }))

  EventService
    .getTournaments(id)
    .then(tournaments => dispatch(success(tournaments)))
    .catch(error => dispatch(failure(error)))
}

const getCount = () => dispatch => {
  const request = () => ({
    type: eventConstants.GETCOUNT_REQUEST,
    isFetching: true,
    count: 0
  })

  const success = count => ({
    type: eventConstants.GETCOUNT_SUCCESS,
    isFetching: false,
    count
  })

  const failure = error => {
    return {
      type: eventConstants.GETCOUNT_FAILURE,
      isFetching: false,
      status: error.status,
      statusText: error.statusText,
      count: 0
    }
  }

  dispatch(request())

  EventService
    .count()
    .then(count => dispatch(success(count)))
    .catch(error => dispatch(failure(error)))
}

export const eventActions = {
  getAll,
  get,
  getTournaments,
  getCount
}

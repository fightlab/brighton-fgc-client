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
      isAuthenticated: true,
      events
    }
  }

  const failure = error => {
    return {
      type: eventConstants.GETALL_FAILURE,
      isFetching: false,
      isAuthenticated: false,
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

export const eventActions = {
  getAll
}

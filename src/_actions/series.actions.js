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
      isAuthenticated: true,
      standings
    }
  }

  const failure = error => {
    return {
      type: seriesConstans.GETSTANDINGS_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      status: error.status,
      statusText: error.statusText
    }
  }

  dispatch(request({ id }))

  SeriesService
    .getStandings(id, limit)
    .then(tournaments => dispatch(success(tournaments)))
    .catch(error => dispatch(failure(error)))
}

export const seriesActions = {
  getStandings
}

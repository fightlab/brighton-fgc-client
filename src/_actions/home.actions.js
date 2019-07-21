import { HomeConstants } from '../_constants'
import { HomeService } from '../_services'

const statistics = () => dispatch => {
  const req = () => ({
    type: HomeConstants.GET_STATS_REQ,
    statistics: {}
  })

  const res = _statistics => ({
    type: HomeConstants.GET_STATS_RES,
    statistics: _statistics
  })

  const err = error => ({
    type: HomeConstants.GET_STATS_ERR,
    statistics: error
  })

  dispatch(req())

  HomeService
    .statistics()
    .then(stats => dispatch(res(stats)))
    .catch(error => dispatch(err(error)))
}

export const HomeActions = {
  statistics
}

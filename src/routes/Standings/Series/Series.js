import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'

const Series = ({ match }) => (
  <Typography type='body2' component='p'>
    {match.params.seriesId}
  </Typography>
)

Series.propTypes = {
  match: PropTypes.any
}

export default Series

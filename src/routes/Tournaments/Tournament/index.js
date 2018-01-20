import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'

const Tournament = ({ match }) => (
  <Typography type='body2' component='p'>
    {match.params.tournamentId}
  </Typography>
)

Tournament.propTypes = {
  match: PropTypes.any
}

export default Tournament

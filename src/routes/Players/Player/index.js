import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'

const Player = ({ match }) => (
  <Typography variant='body2' component='p'>
    {match.params.playerId}
  </Typography>
)

Player.propTypes = {
  match: PropTypes.any
}

export default Player

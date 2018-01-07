import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'

const Game = ({ match }) => (
  <Typography type='body2' component='p'>
    {match.params.gameId}
  </Typography>
)

Game.propTypes = {
  match: PropTypes.any
}

export default Game

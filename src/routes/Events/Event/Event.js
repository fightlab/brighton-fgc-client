import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'

const Event = ({ match }) => (
  <Typography type='body2' component='p'>
    {match.params.eventId}
  </Typography>
)

Event.propTypes = {
  match: PropTypes.any
}

export default Event

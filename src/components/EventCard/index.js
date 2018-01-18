import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card'
import { Typography } from 'material-ui'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

import { DateService } from '../../_services'

const styles = theme => ({
  card: {
    width: '100%'
  }
})

class EventCard extends React.Component {
  render () {
    const { event, classes } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          title={event.name}
          subheader={DateService.format(event.date, 'DATE_HUGE')}
        />
        <CardContent>
          <Typography component='p' align='center' type='caption'>
              Venue:
          </Typography>
          <Typography component='p' align='center' gutterBottom>
            {event.venue}
          </Typography>
          <Typography component='p' align='center' type='caption'>
              Date:
          </Typography>
          <Typography component='p' align='center' gutterBottom>
            {DateService.format(event.date, 'TIME_SIMPLE')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense color='primary' component={Link} to={`/events/${event.id}`}>
              View Event
          </Button>
        </CardActions>
      </Card>
    )
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventCard)

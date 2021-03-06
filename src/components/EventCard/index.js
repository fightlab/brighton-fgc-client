import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { DateService } from '../../_services'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    flexGrow: 1
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    flexGrow: 1
  }
})

class EventCard extends React.Component {
  render () {
    const { event, classes } = this.props
    return (
      <Card className={classes.card} elevation={10}>
        <CardHeader
          title={event.name}
          className={classes.cardHeader}
          subheader={DateService.format(event.date, 'DATE_HUGE')}
        />
        <CardContent
          className={classes.cardContent}
        >
          <Typography component='p' align='center' variant='caption'>
              Venue:
          </Typography>
          <Typography component='p' align='center' gutterBottom>
            {event.venue}
          </Typography>
          <Typography component='p' align='center' variant='caption'>
              Time:
          </Typography>
          <Typography component='p' align='center' gutterBottom>
            {DateService.format(event.date, 'TIME_SIMPLE')}
          </Typography>
        </CardContent>
        <CardActions
          className={classes.cardActions}
        >
          <Button dense='true' color='primary' component={Link} to={`/events/${event.id}`}>
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

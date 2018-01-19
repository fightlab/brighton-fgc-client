import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { filter, orderBy } from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { eventActions } from '../../_actions'
import { DateService } from '../../_services'

import EventCard from '../../components/EventCard'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    width: '100%'
  },
  media: {
    height: 200,
    backgroundSize: 'contain'
  }
})

class Root extends React.Component {
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(eventActions.getAll())
  }

  render () {
    const { classes, event } = this.props
    const upcoming = orderBy(filter(event.events, e => DateService.compareDates(e.date, new Date().toISOString())), 'date', 'desc')
    const past = orderBy(filter(event.events, e => !DateService.compareDates(e.date, new Date().toISOString())), 'date', 'desc')

    return (
      <div>
        {
          upcoming.length && <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography type='display1' component='h2'>
                Upcoming Events
              </Typography>
            </Grid>
            {
              upcoming.map(event => (
                <Grid item xs={12} sm={4} lg={3} key={event.id}>
                  <EventCard event={event} />
                </Grid>
              ))
            }
          </Grid>
        }
        {
          past.length && <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography type='display1' component='h2'>
                Past Events
              </Typography>
            </Grid>
            {
              past.map(event => (
                <Grid item xs={12} sm={4} lg={3} key={event.id}>
                  <EventCard event={event} />
                </Grid>
              ))
            }
          </Grid>
        }
      </div>
    )
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { event } = state
  return {
    event
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Root)))

import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  componentDidMount () {
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
          event.isFetching &&
            <Grid spacing={2} container className={classes.container}>
              <Grid item xs={12}>
                <Typography variant='h4' component='h2'>
                Upcoming Events
                </Typography>
              </Grid>
              <CircularProgress className={classes.progress} size={50} />
            </Grid>
        }
        {
          !!upcoming.length &&
            <Grid spacing={2} container className={classes.container}>
              <Grid item xs={12}>
                <Typography variant='h4' component='h2'>
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
          event.isFetching &&
            <Grid spacing={2} container className={classes.container}>
              <Grid item xs={12}>
                <Typography variant='h4' component='h2'>
              Past Events
                </Typography>
              </Grid>
              <CircularProgress className={classes.progress} size={50} />
            </Grid>
        }
        {
          !!past.length &&
            <Grid spacing={2} container className={classes.container}>
              <Grid item xs={12}>
                <Typography variant='h4' component='h2'>
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

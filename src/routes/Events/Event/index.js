import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { orderBy } from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'

import TournamentCard from '../../../components/TournamentCard'

import { DateService } from '../../../_services'
import { eventActions } from '../../../_actions'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    width: '100%'
  }
})

class Event extends React.Component {
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(eventActions.get(match.params.eventId))
    dispatch(eventActions.getTournaments(match.params.eventId))
  }

  render () {
    const { classes, event } = this.props
    const { tournaments = [] } = event

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant='display1' component='h2'>
            {event.event && event.event.name}
          </Typography>
          <Typography variant='subheading' component='h4'>
            {event.event && DateService.format(event.event.date)}
          </Typography>
          <Typography variant='subheading' component='h4'>
            {event.event && event.event.venue}
          </Typography>
          <a href={event.event && event.event.url} target='_blank' className='no-decor'>
            <Button dense='true' raised color='primary'>
              Event page
            </Button>
          </a>
        </Grid>
        {
          tournaments.length && <Grid item xs={12}>
            <Typography variant='title' component='h3'>
                Tournaments
            </Typography>
          </Grid>
        }
        {
          tournaments.length && orderBy(tournaments, 'dateStart', 'desc').map(tournament => (
            <TournamentCard tournament={tournament} key={tournament.id} />
          ))
        }
      </Grid>
    )
  }
}

Event.propTypes = {
  dispatch: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  match: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { event } = state
  return {
    event
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Event)))

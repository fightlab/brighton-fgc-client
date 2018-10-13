import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import orderBy from 'lodash/orderBy'
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
  },
  item: {
    textAlign: 'center'
  }
})

class Event extends React.Component {
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(eventActions.get(match.params.eventId))
    dispatch(eventActions.getTournaments(match.params.eventId))
  }

  render () {
    const { classes, event: _event } = this.props
    const { tournaments = [], event } = _event

    return (
      <Grid spacing={16} container className={classes.container}>
        <Grid item xs={12} className={classes.item}>
          <Typography variant='display1' component='h2'>
            {event && event.name}
          </Typography>
          <Typography variant='subheading' component='h4'>
            {event && DateService.format(event.date)}
          </Typography>
          <Typography variant='subheading' component='h4'>
            {event && event.venue}
          </Typography>
          <Button dense='true' color='primary' href={event && event.url} target='_blank'>
            Event page
          </Button>
        </Grid>
        {
          !!tournaments.length && <Grid item xs={12}>
            <Typography variant='title' component='h3'>
                Tournaments
            </Typography>
          </Grid>
        }
        {
          !!tournaments.length && orderBy(tournaments, 'dateStart', 'desc').map(tournament => (
            <Grid item xs={12} sm={4} lg={3} key={tournament.id}>
              <TournamentCard tournament={tournament} key={tournament.id} />
            </Grid>
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

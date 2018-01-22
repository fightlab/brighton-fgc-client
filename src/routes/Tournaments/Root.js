import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { filter, orderBy } from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'

import { tournamentActions } from '../../_actions'
import { DateService } from '../../_services'

import TournamentCard from '../../components/TournamentCard'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  media: {
    height: 200,
    backgroundSize: 'contain'
  }
})

class Root extends React.Component {
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(tournamentActions.getAll())
  }

  render () {
    const { classes, tournament } = this.props
    const upcoming = orderBy(filter(tournament.tournaments, e => DateService.compareDates(e.dateStart, new Date().toISOString())), 'dateStart', 'desc')
    const past = orderBy(filter(tournament.tournaments, e => !DateService.compareDates(e.dateStart, new Date().toISOString())), 'dateStart', 'desc')

    return (
      <div>
        {
          tournament.isFetching && <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography type='display1' component='h2'>
                Upcoming Tournaments
              </Typography>
            </Grid>
            {
              <CircularProgress className={classes.progress} size={50} />
            }
          </Grid>
        }
        {
          !!upcoming.length && <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography type='display1' component='h2'>
                Upcoming Tournaments
              </Typography>
            </Grid>
            {
              upcoming.map(tournament => (
                <TournamentCard tournament={tournament} key={tournament.id} />
              ))
            }
          </Grid>
        }
        {
          tournament.isFetching && <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography type='display1' component='h2'>
                Past Tournaments
              </Typography>
            </Grid>
            {
              <CircularProgress className={classes.progress} size={50} />
            }
          </Grid>
        }
        {
          !!past.length && <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography type='display1' component='h2'>
                Past Tournaments
              </Typography>
            </Grid>
            {
              past.map(tournament => (
                <TournamentCard tournament={tournament} key={tournament.id} />
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
  tournament: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { tournament } = state
  return {
    tournament
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Root)))

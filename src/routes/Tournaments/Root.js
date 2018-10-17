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
          tournament.isFetching && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='h4' component='h2'>
                Upcoming Tournaments
              </Typography>
            </Grid>
            {
              <CircularProgress className={classes.progress} size={50} />
            }
          </Grid>
        }
        {
          !!upcoming.length && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='h4' component='h2'>
                Upcoming Tournaments
              </Typography>
            </Grid>
            {
              upcoming.map(tournament => (
                <Grid item xs={12} sm={4} lg={3} key={tournament.id}>
                  <TournamentCard key={tournament.id} tournament={tournament} />
                </Grid>
              ))
            }
          </Grid>
        }
        {
          tournament.isFetching && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='h4' component='h2'>
                Past Tournaments
              </Typography>
            </Grid>
            {
              <CircularProgress className={classes.progress} size={50} />
            }
          </Grid>
        }
        {
          !!past.length && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='h4' component='h2'>
                Past Tournaments
              </Typography>
            </Grid>
            {
              past.map(tournament => (
                <Grid item xs={12} sm={4} lg={3} key={tournament.id}>
                  <TournamentCard tournament={tournament} key={tournament.id} />
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
  tournament: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { tournament } = state
  return {
    tournament
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Root)))

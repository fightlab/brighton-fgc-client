import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { seriesActions } from '../../../_actions'
import { DateService } from '../../../_services'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import orderBy from 'lodash/orderBy'

import GameCard from '../../../components/GameCard'
import TournamentCard from '../../../components/TournamentCard'
import StandingList from '../../../components/StandingsList'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  standingsCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  standingsCardContent: {
    flexGrow: 1,
    padding: '0 !important'
  }
})

class Series extends React.Component {
  componentWillMount () {
    const { dispatch, match } = this.props

    dispatch(seriesActions.get(match.params.seriesId))
    dispatch(seriesActions.getTournaments(match.params.seriesId))
  }

  render () {
    const { classes, series = {}, match } = this.props
    let { tournaments = [] } = series
    const { name, updatedAt, _gameId: game } = series._series || {}

    tournaments = orderBy(tournaments, 'dateStart', 'desc')

    return (
      <Grid spacing={16} container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant='h4' component='h2'>
            { name }
          </Typography>
          <Typography variant='caption' gutterBottom>
            Last Updated - {updatedAt && DateService.format(updatedAt)}
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card className={classes.standingsCard} elevation={10}>
            <CardContent
              className={classes.standingsCardContent}
            >
              <StandingList variant='series' id={match.params.seriesId} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          { game && <GameCard game={game} /> }
        </Grid>
        {
          !!tournaments.length && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='h4' component='h2'>
                Tournaments
              </Typography>
            </Grid>
            {
              tournaments.map(tournament => (
                <Grid item xs={12} sm={4} lg={3} key={tournament.id}>
                  <TournamentCard key={tournament.id} tournament={tournament} />
                </Grid>
              ))
            }
          </Grid>
        }
      </Grid>
    )
  }
}

Series.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.any,
  series: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { series } = state
  return {
    series
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Series))

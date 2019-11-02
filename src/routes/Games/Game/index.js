import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import orderBy from 'lodash/orderBy'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import filter from 'lodash/filter'

import BaseHomeCard from '../../../components/BaseHomeCard'
import EloList from '../../../components/EloList'
import TournamentList from '../../../components/TournamentList'
import { DateService } from '../../../_services'

import { gameActions } from '../../../_actions'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    width: '100%'
  }
})

class Game extends React.Component {
  componentDidMount () {
    const { dispatch, match } = this.props
    dispatch(gameActions.get(match.params.gameId))
    dispatch(gameActions.getTournaments(match.params.gameId))
  }

  render () {
    const { classes, game, match } = this.props
    const { tournaments = [] } = game

    const nextTournaments = orderBy(filter(tournaments, tournament => DateService.compareDates(tournament.dateStart, new Date().toISOString())), 'date', 'desc')
    const pastTournaments = orderBy(filter(tournaments, tournament => DateService.compareDates(new Date().toISOString(), tournament.dateStart)), 'date', 'desc')

    return (
      <Grid spacing={2} container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant='h4' component='h2'>
            {game.game && game.game.name}
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <BaseHomeCard title='Elo Ranking'>
            <EloList id={match.params.gameId} />
          </BaseHomeCard>
        </Grid>
        <Grid item sm={6} xs={12}>
          <BaseHomeCard title='Tournaments'>
            {
              !!nextTournaments.length && <TournamentList
                subheader='Upcoming'
                tournaments={nextTournaments}
                dense
                showGame={false}
                detailed
              />
            }
            {
              !!pastTournaments.length && <TournamentList
                subheader='Past'
                tournaments={pastTournaments}
                dense
                showGame={false}
                detailed
              />
            }
          </BaseHomeCard>
        </Grid>
      </Grid>
    )
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  match: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { game } = state
  return {
    game
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Game)))

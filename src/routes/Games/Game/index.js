import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { orderBy } from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import TournamentCard from '../../../components/TournamentCard'

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
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(gameActions.get(match.params.gameId))
    dispatch(gameActions.getTournaments(match.params.gameId))
  }

  render () {
    const { classes, game } = this.props
    const { tournaments = [] } = game

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant='display1' component='h2'>
            {game.game && game.game.name}
          </Typography>
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
            <Grid item xs={12} sm={4} lg={3} key={tournament.id}>
              <TournamentCard tournament={tournament} key={tournament.id} />
            </Grid>
          ))
        }
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

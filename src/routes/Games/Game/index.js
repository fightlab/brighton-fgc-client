import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { orderBy } from 'lodash'

import TournamentCard from '../../../components/TournamentCard'

import { GameService } from '../../../_services'

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
  constructor (props) {
    super(props)

    this.state = {
      game: {},
      tournaments: []
    }

    this.handleError = this.handleError.bind(this)
  }

  handleError (error) {
    this.setState({ error })
  }

  async componentWillMount () {
    const { match, setBg } = this.props

    // get game information
    const game = await GameService.get(match.params.gameId).catch(this.handleError)

    // get tournaments information
    const tournaments = orderBy(await GameService.getTournaments(match.params.gameId).catch(this.handleError), ['dateStart'], ['desc'])

    setBg(game.bgUrl)

    this.setState({ game, tournaments })
  }

  render () {
    const { classes } = this.props
    const { game, tournaments } = this.state

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography type='title' component='h3'>
            {game.name}
          </Typography>
        </Grid>
        {
          tournaments.map(tournament => (
            <TournamentCard tournament={tournament} key={tournament.id} />
          ))
        }
      </Grid>
    )
  }
}

Game.propTypes = {
  match: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  setBg: PropTypes.func.isRequired
}

export default withStyles(styles)(Game)

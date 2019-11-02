import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import orderBy from 'lodash/orderBy'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import { gameActions } from '../../_actions'

import GameCard from '../../components/GameCard'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  }
})

class Root extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(gameActions.getAll())
  }

  render () {
    const { classes, game } = this.props
    const games = orderBy(game.games, 'name', 'asc')

    return (
      <Grid spacing={2} container className={classes.container}>
        {
          game.isFetching && <CircularProgress className={classes.progress} size={50} />
        }
        {
          !!games.length && games.map(game => (
            <Grid item xs={12} sm={4} lg={3} key={game.id}>
              <GameCard game={game} />
            </Grid>
          ))
        }
      </Grid>
    )
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { game } = state
  return {
    game
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Root)))

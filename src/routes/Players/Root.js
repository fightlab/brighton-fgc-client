import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import orderBy from 'lodash/orderBy'

import { playerActions } from '../../_actions'

import PlayerCard from '../../components/PlayerCard'

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
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(playerActions.getAll())
  }

  render () {
    const { classes, player = {} } = this.props
    let { players = [] } = player

    players = orderBy(players, ['isStaff', 'tournaments', 'handle'], ['asc', 'desc', 'asc'])

    return (
      <div>
        {
          player.isFetching && <Grid spacing={2} container className={classes.container}>
            {
              <CircularProgress className={classes.progress} size={50} />
            }
          </Grid>
        }
        {
          !!players.length && <Grid spacing={2} container className={classes.container}>
            {
              players.map(player => (
                <Grid item xs={6} sm={4} lg={3} key={player._id}>
                  <PlayerCard player={player} />
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
  player: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { player } = state
  return {
    player
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Root)))

import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
import { orderBy } from 'lodash'

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
  componentWillMount () {
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
          player.isFetching && <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='display1' component='h2'>
                Players
              </Typography>
            </Grid>
            {
              <CircularProgress className={classes.progress} size={50} />
            }
          </Grid>
        }
        {
          !!players.length && <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='display1' component='h2'>
                Players
              </Typography>
            </Grid>
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

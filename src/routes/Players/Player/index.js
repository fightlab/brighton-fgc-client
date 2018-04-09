import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, Button, Avatar } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { playerActions } from '../../../_actions'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  item: {
    textAlign: 'center'
  },
  card: {
    width: '100%'
  },
  bigAvatar: {
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 75,
    height: 75
  }
})

class Player extends React.Component {
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(playerActions.get(match.params.playerId))
  }

  render () {
    const { classes, player: _player } = this.props
    const { player = {} } = _player

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.item}>
          <Typography variant='display1' component='h2' align='center'>
            {player.handle}
          </Typography>
          <Avatar
            className={classes.bigAvatar}
            alt={player.handle}
            src={`https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`}
          />
          <Typography variant='subheading' component='h4' align='center'>
            {player.isStaff ? 'Habrewken Staff' : <span>&nbsp;</span>}
          </Typography>
          <Button dense='true' raised='true' color='primary' href={`https://challonge.com/users/${player.challongeUsername}`} target='_blank'>
              User Challonge Page
          </Button>
        </Grid>
      </Grid>
    )
  }
}

Player.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  match: PropTypes.any,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { player } = state
  return {
    player
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Player)))

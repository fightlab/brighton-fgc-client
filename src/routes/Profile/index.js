import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typography, Paper, Grid, Avatar } from 'material-ui'
import { userActions } from '../../_actions'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  }),
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  item: {
    textAlign: 'center'
  },
  bigAvatar: {
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 75,
    height: 75
  },
  link: {
    color: theme.palette.text.primary
  }
})

class Profile extends React.Component {
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(userActions.getProfile())
    dispatch(userActions.getPlayer())
  }

  render () {
    const { classes, auth } = this.props
    const { profile = {}, player = null, USERS_GETPLAYER_FAILURE = null } = auth

    return (
      <Paper className={classes.root} elevation={0}>
        <Typography variant='display2' component='h1'>
          Profile
        </Typography>
        <Grid
          spacing={16}
          container
          className={classes.container}
        >
          <Grid item xs={12} className={classes.item}>
            <Typography variant='display1' component='h2'>
              {profile.name}
            </Typography>
            <Avatar
              className={classes.bigAvatar}
              alt={profile.name}
              src={profile.picture}
            />
            <Typography align='center' variant='caption'>
              Handle/Nickname:
            </Typography>
            <Typography align='center' gutterBottom>
              {profile.nickname}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant='display2' component='h1'>
          Player
        </Typography>
        <Grid
          spacing={16}
          container
          className={classes.container}
        >
          {
            USERS_GETPLAYER_FAILURE &&
            <Typography>
              {
                USERS_GETPLAYER_FAILURE.statusCode === 404 && <span>
                  No player found for your email. Contact <a className={classes.link} href='/players/5a5b943433e9a91eb8a6b993'>ColdLink</a> to attach a player to your user profile.
                </span>
              }
            </Typography>
          }
          {
            player && <Grid item xs={12} className={classes.item}>
              <Typography variant='display1' component='h2'>
                {player.handle}
              </Typography>
              <Avatar
                className={classes.bigAvatar}
                alt={player.handle}
                src={player.imageUrl}
              />
            </Grid>
          }
        </Grid>
      </Paper>
    )
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    auth
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Profile)))

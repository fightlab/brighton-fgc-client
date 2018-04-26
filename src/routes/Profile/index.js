import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typography, Paper, Grid, Avatar, TextField, Button, Tooltip } from 'material-ui'
import { userActions } from '../../_actions'
import { set, get } from 'lodash'

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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class Profile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.savePlayer = this.savePlayer.bind(this)
  }

  handleChange (event) {
    const { player } = this.state
    if (event.target.value) {
      set(player, event.target.name, event.target.value)
    } else if (event.target.name === 'handle') {
      delete player[event.target.name]
    } else {
      set(player, event.target.name, '')
    }
    this.setState({ player })
  }

  savePlayer () {
    const { player } = this.state
    console.log(player)
  }

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(userActions.getProfile())
    dispatch(userActions.getPlayer())
  }

  render () {
    const { player } = this.state
    const { classes, auth } = this.props
    const { profile = {}, player: _player = null, USERS_GETPLAYER_FAILURE = null } = auth

    return (
      <Paper className={classes.root} elevation={0}>
        <Typography variant='display2' component='h1'>
          User Profile
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
              Email:
            </Typography>
            <Typography align='center' gutterBottom>
              {profile.email}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant='display2' component='h1'>
          Habrewken Player Profile
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
            _player && <Grid item xs={12} className={classes.item}>
              <Tooltip title='Update Profile Picture on Challonge. Will be updated after the next tournament you partake in.' placement='top'>
                <Avatar
                  className={classes.bigAvatar}
                  alt={_player.handle}
                  src={_player.imageUrl}
                />
              </Tooltip>
              <Grid item xs={12} className={classes.item}>
                <Tooltip title='Your handle on this site' placement='top'>
                  <TextField
                    required
                    id='handle'
                    name='handle'
                    label='Handle'
                    placeholder='Handle'
                    value={get(player, 'handle', get(_player, 'handle', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Tooltip title='twitter.com/{profile}' placement='top'>
                  <TextField
                    id='profile.twitter'
                    name='profile.twitter'
                    label='Twitter'
                    placeholder='Twitter'
                    value={get(player, 'profile.twitter', get(_player, 'profile.twitter', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='instagram.com/{profile}' placement='top'>
                  <TextField
                    id='profile.instagram'
                    name='profile.instagram'
                    label='Instagram'
                    placeholder='Instagram'
                    value={get(player, 'profile.instagram', get(_player, 'profile.instagram', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='e.g: https://hbk.gg' placement='top'>
                  <TextField
                    id='profile.web'
                    name='profile.web'
                    label='Website'
                    placeholder='Website'
                    value={get(player, 'profile.web', get(_player, 'profile.web', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='Playstation Network Username' placement='top'>
                  <TextField
                    id='profile.playstation'
                    name='profile.playstation'
                    label='PSN'
                    placeholder='PSN'
                    value={get(player, 'profile.playstation', get(_player, 'profile.playstation', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='Xbox Live GamerTag' placement='top'>
                  <TextField
                    id='profile.xbox'
                    name='profile.xbox'
                    label='XBL'
                    placeholder='XBL'
                    value={get(player, 'profile.xbox', get(_player, 'profile.xbox', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='steamcommunity.com/id/{profile}' placement='top'>
                  <TextField
                    id='profile.steam'
                    name='profile.steam'
                    label='Steam'
                    placeholder='Steam'
                    value={get(player, 'profile.steam', get(_player, 'profile.steam', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='Discord Tag' placement='top'>
                  <TextField
                    id='profile.discord'
                    name='profile.discord'
                    label='Discord'
                    placeholder='Discord'
                    value={get(player, 'profile.discord', get(_player, 'profile.discord', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
                <Tooltip title='twitch.tv/{profile}' placement='top'>
                  <TextField
                    id='profile.twitch'
                    name=' .twitch'
                    label='Twitch'
                    placeholder='Twitch'
                    value={get(player, 'profile.twitch', get(_player, 'profile.twitch', ''))}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin='normal'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Button variant='raised' color='secondary' onClick={this.savePlayer} className={classes.button}>
                  Save
                </Button>
              </Grid>
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

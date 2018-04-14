import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
// import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import { Typography, Tooltip } from 'material-ui'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { Facebook, Twitter, Instagram, Web, Playstation, Xbox, Steam, Twitch, Discord } from 'mdi-material-ui'

// import { MetaService } from '../../_services'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    flexGrow: 1
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    flexGrow: 1
  },
  iconButton: {
    minWidth: 56,
    padding: 8
  },
  center: {
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

class PlayerCard extends React.Component {
  getImage (player) {
    if (player.imageUrl) return player.imageUrl
    return `https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`
  }

  render () {
    const { player = {}, classes } = this.props
    const { profile } = player
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='headline' component='h2' align='center' noWrap>
            {player.handle}
          </Typography>
          <Typography component='p' align='center' variant='caption'>
            {player.isStaff ? 'Habrewken Staff' : <span>&nbsp;</span>}
          </Typography>
          <Avatar
            className={classes.center}
            alt={player.handle}
            src={this.getImage(player)}
          />
          <Typography component='p' align='center' variant='caption'>
            Tournaments:
          </Typography>
          <Typography component='p' align='center' gutterBottom>
            {player.tournaments}
          </Typography>
          {
            profile && <Typography component='p' align='center' variant='caption'>
              Profiles:
            </Typography>
          }
          {
            profile && <Typography component='p' align='center' gutterBottom>
              {
                profile.web && <Button size='small' href={profile.web}>
                  <Web />
                </Button>
              }
              {
                profile.facebook && <Button size='small' href={`https://facebook.com/${profile.facebook}`}>
                  <Facebook />
                </Button>
              }
              {
                profile.twitter && <Button size='small' href={`https://twitter.com/${profile.twitter}`}>
                  <Twitter />
                </Button>
              }
              {
                profile.instagram && <Button size='small' href={`https://instagram.com/${profile.instagram}`}>
                  <Instagram />
                </Button>
              }
              {
                profile.playstation && <Tooltip title={profile.playstation} placement='bottom'>
                  <Button size='small' href={`https://my.playstation.com/profile/${profile.playstation}`}>
                    <Playstation />
                  </Button>
                </Tooltip>
              }
              {
                profile.xbox && <Tooltip title={profile.xbox} placement='bottom'>
                  <Button size='small' href={`https://account.xbox.com/en-gb/Profile?GamerTag=${profile.xbox}`}>
                    <Xbox />
                  </Button>
                </Tooltip>
              }
              {
                profile.steam && <Tooltip title={profile.steam} placement='bottom'>
                  <Button size='small' href={`https://steamcommunity.com/id/${profile.steam}`}>
                    <Steam />
                  </Button>
                </Tooltip>
              }
              {
                profile.twitch && <Button size='small' href={`https://twitch.tv/${profile.twitch}`}>
                  <Twitch />
                </Button>
              }
              {
                profile.discord && <Tooltip title={profile.discord} placement='bottom'>
                  <Button size='small' className={classes.iconButton}>
                    <Discord />
                  </Button>
                </Tooltip>
              }
            </Typography>
          }
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button dense='true' color='primary' component={Link} to={`/players/${player._id}`}>
            View Player
          </Button>
        </CardActions>
      </Card>
    )
  }
}

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PlayerCard)

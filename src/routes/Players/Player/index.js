import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import AppBar from 'material-ui/AppBar'
import Tooltip from 'material-ui/Tooltip'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs, { Tab } from 'material-ui/Tabs'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import { InputLabel } from 'material-ui/Input'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import { get } from 'lodash'
import Facebook from 'mdi-material-ui/Facebook'
import Twitter from 'mdi-material-ui/Twitter'
import Instagram from 'mdi-material-ui/Instagram'
import Web from 'mdi-material-ui/Web'
import Playstation from 'mdi-material-ui/Playstation'
import Xbox from 'mdi-material-ui/Xbox'
import Steam from 'mdi-material-ui/Steam'
import Twitch from 'mdi-material-ui/Twitch'
import Discord from 'mdi-material-ui/Discord'
import GithubCircle from 'mdi-material-ui/GithubCircle'
import { playerActions } from '../../../_actions'
import TournamentList from '../../../components/TournamentList'
import GameList from '../../../components/GameList'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  item: {
    textAlign: 'center'
  },
  card: {
    width: '100%',
    display: 'flex'
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column'
  },
  standingsCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  standingsCardHeader: {
    // flexGrow: 1
  },
  standingsCardContent: {
    flexGrow: 1
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
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 0,
      game: 'total',
      opponent: 'none',
      gameH2H: 'total'
    }

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleTabChange (event, index) {
    this.setState({ selectedTab: index })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })

    if (event.target.name === 'opponent' && event.target.value !== 'none') {
      const { dispatch, match } = this.props
      this.setState({ gameH2H: 'total' })
      dispatch(playerActions.getStatisticsHeadToHead(match.params.playerId, event.target.value))
    }
  }

  calculateWinRatio (wins = 0, games = 0) {
    if (!games) return '∞'
    return ((wins / games) * 100).toFixed(2)
  }

  getImage (player) {
    if (player.imageUrl) return player.imageUrl
    return `https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`
  }

  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(playerActions.get(match.params.playerId))
    dispatch(playerActions.getStatistics(match.params.playerId))
    dispatch(playerActions.getOpponents(match.params.playerId, true))
  }

  render () {
    const { selectedTab, game: selectedGame, opponent: selectedOpponent, gameH2H } = this.state
    const { classes, player: _player, match } = this.props
    const { player = {}, statistics = {}, opponents = [], headToHead = {} } = _player
    const { profile } = player

    return (
      <Grid spacing={16} container className={classes.container}>
        <Grid item xs={12} className={classes.item}>
          <Typography variant='display1' component='h2' align='center'>
            {player.handle}
          </Typography>
          <Avatar
            className={classes.bigAvatar}
            alt={player.handle}
            src={this.getImage(player)}
          />
          <Typography variant='subheading' component='h4' align='center'>
            {player.isStaff ? 'Habrewken Staff' : <span>&nbsp;</span>}
          </Typography>
          {
            profile && <Typography component='p' align='center' gutterBottom>
              {
                profile.web && <Button size='small' target='_blank' href={profile.web}>
                  <Web />
                </Button>
              }
              {
                profile.facebook && <Button size='small' target='_blank' href={`https://facebook.com/${profile.facebook}`}>
                  <Facebook />
                </Button>
              }
              {
                profile.twitter && <Button size='small' target='_blank' href={`https://twitter.com/${profile.twitter}`}>
                  <Twitter />
                </Button>
              }
              {
                profile.instagram && <Button size='small' target='_blank' href={`https://instagram.com/${profile.instagram}`}>
                  <Instagram />
                </Button>
              }
              {
                profile.playstation && <Tooltip title={profile.playstation} placement='bottom'>
                  <Button size='small' target='_blank' href={`https://my.playstation.com/profile/${profile.playstation}`}>
                    <Playstation />
                  </Button>
                </Tooltip>
              }
              {
                profile.xbox && <Tooltip title={profile.xbox} placement='bottom'>
                  <Button size='small' target='_blank' href={`https://account.xbox.com/en-gb/Profile?GamerTag=${profile.xbox}`}>
                    <Xbox />
                  </Button>
                </Tooltip>
              }
              {
                profile.steam && <Tooltip title={profile.steam} placement='bottom'>
                  <Button size='small' target='_blank' href={`https://steamcommunity.com/id/${profile.steam}`}>
                    <Steam />
                  </Button>
                </Tooltip>
              }
              {
                profile.twitch && <Button size='small' target='_blank' href={`https://twitch.tv/${profile.twitch}`}>
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
              {
                profile.github && <Button size='small' target='_blank' href={`https://github.com/${profile.github}`}>
                  <GithubCircle />
                </Button>
              }
            </Typography>
          }
          <Button color='primary' target='_blank' href={`https://challonge.com/users/${player.challongeUsername}`}>
              User Challonge Page
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} lg={6} className={classes.cardGrid}>
          <AppBar position='static' color='default'>
            <Tabs
              value={selectedTab}
              onChange={this.handleTabChange}
              indicatorColor='primary'
              textColor='primary'
              fullWidth
            >
              <Tab label='Tournaments' />
              <Tab label='Games' />
            </Tabs>
          </AppBar>
          {
            selectedTab === 0 && <Card className={classes.standingsCard} elevation={10}>
              <CardContent
                className={classes.standingsCardContent}
              >
                <Typography variant='headline' gutterBottom>
                  { statistics.tournaments && statistics.tournaments.lplayer2winsngth } {statistics.tournaments && statistics.tournaments.length === '1' ? 'Tournament' : 'Tournaments'}
                </Typography>
                <TournamentList tournaments={statistics.tournaments} />
              </CardContent>
            </Card>
          }
          {
            selectedTab === 1 && <Card className={classes.standingsCard} elevation={10}>
              <CardContent
                className={classes.standingsCardContent}
              >
                <Typography variant='headline' gutterBottom>
                  { statistics.games && statistics.games.length } {statistics.tournaments && statistics.tournaments.length === '1' ? 'Game' : 'Games'}
                </Typography>
                <GameList games={statistics.games} />
              </CardContent>
            </Card>
          }
        </Grid>
        <Grid item xs={12} sm={12} lg={6} className={classes.cardGrid}>
          <Card className={classes.standingsCard} elevation={10}>
            <CardHeader
              title='Overall Statistics'
              action={
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='game-simple'>Game</InputLabel>
                  <Select
                    value={selectedGame}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'game',
                      id: 'game-simple'
                    }}
                  >
                    <MenuItem value='total'>All Games</MenuItem>
                    {
                      statistics.games && statistics.games.map(game => (
                        <MenuItem key={game._id} value={game._id}>{game.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              }
            />
            {
              statistics.matches && statistics.rounds && <CardContent
                className={classes.standingsCardContent}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='headline' gutterBottom align='center'>
                      Matches
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Total
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(statistics.matches, `${selectedGame}.t`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Wins
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(statistics.matches, `${selectedGame}.w`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Loss
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(statistics.matches, `${selectedGame}.l`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Win%
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { this.calculateWinRatio(get(statistics.matches, `${selectedGame}.w`, 0), get(statistics.matches, `${selectedGame}.t`, 0)) }%
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='headline' gutterBottom align='center'>
                      Match Games
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Total
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(statistics.rounds, `${selectedGame}.t`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Wins
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(statistics.rounds, `${selectedGame}.w`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Loss
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(statistics.rounds, `${selectedGame}.l`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Win%
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { this.calculateWinRatio(get(statistics.rounds, `${selectedGame}.w`, 0), get(statistics.rounds, `${selectedGame}.t`, 0)) }%
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            }
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={6} className={classes.cardGrid}>
          <Card className={classes.standingsCard} elevation={10}>
            <CardHeader
              title='Head To Head'
              action={
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='opponent-simple'>Opponent</InputLabel>
                    <Select
                      value={selectedOpponent}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'opponent',
                        id: 'opponent-simple'
                      }}
                    >
                      <MenuItem selected value='none'>Select Opponent</MenuItem>
                      {
                        opponents.length && opponents.map(opponent => (
                          <MenuItem key={opponent.id} value={opponent.id}>{opponent.handle}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  {
                    get(headToHead, 'player1.id') === match.params.playerId && <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='game-simple'>Game</InputLabel>
                      <Select
                        value={gameH2H}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'gameH2H',
                          id: 'gameH2H-simple'
                        }}
                      >
                        <MenuItem value='total'>All Games</MenuItem>
                        {
                          headToHead.games.map(game => (
                            <MenuItem key={game._id} value={game._id}>{game.name}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  }
                </div>
              }
            />
            <CardContent
              className={classes.standingsCardContent}
            >
              {
                get(headToHead, 'player1.id') === match.params.playerId && <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='headline' gutterBottom align='center'>
                      Matches
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Total
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(headToHead, `statistics.matches.${gameH2H}.total`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Wins VS
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(headToHead, `statistics.matches.${gameH2H}.player1wins`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Loss VS
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(headToHead, `statistics.matches.${gameH2H}.player2wins`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Win%
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { this.calculateWinRatio(get(headToHead, `statistics.matches.${gameH2H}.player1wins`, 0), get(headToHead, `statistics.matches.${gameH2H}.total`, 0)) }%
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='headline' gutterBottom align='center'>
                      Match Games
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Total
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(headToHead, `statistics.games.${gameH2H}.total`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Wins VS
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(headToHead, `statistics.games.${gameH2H}.player1wins`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Loss VS
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { get(headToHead, `statistics.games.${gameH2H}.player2wins`, 0) }
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='title' gutterBottom align='center'>
                      Win%
                    </Typography>
                    <Typography variant='display1' gutterBottom align='center'>
                      { this.calculateWinRatio(get(headToHead, `statistics.games.${gameH2H}.player1wins`, 0), get(headToHead, `statistics.games.${gameH2H}.total`, 0)) }%
                    </Typography>
                  </Grid>
                </Grid>
              }
            </CardContent>
          </Card>
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

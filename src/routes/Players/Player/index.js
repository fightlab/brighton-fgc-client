import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, Button, Avatar, AppBar } from 'material-ui'
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
      game: 'total'
    }

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleTabChange (event, index) {
    this.setState({ selectedTab: index })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  calculateWinRatio (wins = 0, games = 0) {
    if (!games) return '∞'
    return ((wins / games) * 100).toFixed(2)
  }

  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(playerActions.get(match.params.playerId))
    dispatch(playerActions.getStatistics(match.params.playerId))
  }

  render () {
    const { selectedTab, game: selectedGame } = this.state
    const { classes, player: _player } = this.props
    const { player = {}, statistics = {} } = _player

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
          <Button color='primary' href={`https://challonge.com/users/${player.challongeUsername}`} target='_blank'>
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
                  { statistics.tournaments && statistics.tournaments.length } {statistics.tournaments && statistics.tournaments.length === '1' ? 'Tournament' : 'Tournaments'}
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
              title='Statistics'
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
                      Rounds
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

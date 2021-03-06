import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'

import { DateService, MetaService } from '../../../_services'
import { tournamentActions } from '../../../_actions'

import EventCard from '../../../components/EventCard'
import GameCard from '../../../components/GameCard'
import PlayersCard from '../../../components/PlayersCard'
import YoutubeCard from '../../../components/YoutubeCard'

import StandingList from '../../../components/StandingsList'
import EloList from '../../../components/EloList'
import MatchList from '../../../components/MatchList'

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
    flexGrow: 1,
    padding: '0 !important'
  }
})

class Tournament extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 0,
      selectedTabMatch: 0
    }

    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleTabChangeMatch = this.handleTabChangeMatch.bind(this)
  }

  handleTabChange (event, index) {
    this.setState({ selectedTab: index })
  }

  handleTabChangeMatch (event, index) {
    this.setState({ selectedTabMatch: index })
  }

  componentDidMount () {
    const { dispatch, match } = this.props
    dispatch(tournamentActions.get(match.params.tournamentId))
  }

  render () {
    const { classes, tournament: tournamentObj } = this.props
    const { selectedTab, selectedTabMatch } = this.state
    const { tournament } = tournamentObj
    const {
      event = {},
      _gameId: game,
      /* series, */
      players = [],
      bracket = '',
      name = '',
      updatedAt = null,
      dateStart = null,
      dateEnd = null,
      signUpUrl = '',
      id = '',
      // series = null,
      youtube = '',
      type = ''
    } = tournament || {}

    return (
      <Grid
        spacing={16}
        container
        className={classes.container}
      >
        <Grid item xs={12} className={classes.item}>
          <Typography variant='h4' component='h2'>
            {
              !!name && name
            }
          </Typography>
          <Typography variant='caption' gutterBottom>
            Last Updated - {
              !!updatedAt && DateService.format(updatedAt)
            }
          </Typography>
          <Typography variant='subtitle1' component='h4'>
            <b>Event Date:</b>
            <br />
            {
              !!dateStart && DateService.format(dateStart)
            } {
              !!dateEnd && <span> - {DateService.format(dateEnd)}</span>
            }
          </Typography>
          <Typography variant='subtitle1' component='h4'>
            <b>Type:</b>
            <br />
            {MetaService.toTitleCase(type || '')}
          </Typography>
          <br />
          <Button style={{ marginRight: 4 }} color='primary' href={bracket && bracket} target='_blank'>
            Challonge Page
          </Button>
          {
            !!dateStart && DateService.compareDates(dateStart, new Date().toISOString()) && <Button style={{ marginLeft: 4 }} variant='contained' color='secondary' href={signUpUrl && signUpUrl} target='_blank'>
              Sign Up Page
            </Button>
          }
        </Grid>
        <Grid item sm={6} xs={12}>
          {
            !!event && <EventCard event={event} />
          }
        </Grid>
        <Grid item sm={6} xs={12}>
          {
            !!game && <GameCard game={game} />
          }
        </Grid>
        <Grid item sm={6} xs={12}>
          {
            !!players && <PlayersCard players={players} />
          }
        </Grid>
        <Grid item sm={6} xs={12} className={classes.cardGrid}>
          <AppBar position='static' color='default'>
            <Tabs
              value={selectedTab}
              onChange={this.handleTabChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
            >
              <Tab label='Tournament Standings' />
              <Tab label='Game Elo Ranking' />
              {/* {!!series && <Tab label='Series Standings' />} */}
            </Tabs>
          </AppBar>
          {
            selectedTab === 0 && <Card className={classes.standingsCard} elevation={10}>
              <CardContent
                className={classes.standingsCardContent}
              >
                {
                  !!id && <StandingList variant='tournament' id={id} />
                }
              </CardContent>
            </Card>
          }
          {
            selectedTab === 1 && <Card className={classes.standingsCard} elevation={10}>
              <CardContent
                className={classes.standingsCardContent}
              >
                {
                  !!id && <EloList id={game.id} />
                }
              </CardContent>
            </Card>
          }
          {/* {
            selectedTab === 1 && <Card className={classes.standingsCard} elevation={10}>
              <CardContent
                className={classes.standingsCardContent}
              >
                {game && <StandingList variant='game' id={game.id} limit={16} />}
              </CardContent>
            </Card>
          } */}
        </Grid>
        <Grid item xs={12} className={classes.cardGrid}>
          <AppBar position='static' color='default'>
            <Tabs
              value={selectedTabMatch}
              onChange={this.handleTabChangeMatch}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
            >
              <Tab label='Bracket' />
              {
                !!dateEnd && <Tab label='Matches' />
              }
            </Tabs>
          </AppBar>
          {
            selectedTabMatch === 0 && <Card
              className={classes.card}
            >
              {
                !!bracket && <iframe title='bracket' src={`${bracket.replace('http://', 'https://')}/module?multiplier=1&match_width_multiplier=1&show_final_results=0&show_standings=0&theme=2&subdomain=`} style={{ minHeight: '450px', width: '100%' }} frameBorder='0' scrolling='yes' />
              }
            </Card>
          }
          {
            selectedTabMatch === 1 && <Card className={classes.standingsCard} elevation={10}>
              <CardContent
                className={classes.standingsCardContent}
              >
                {id && <MatchList id={id} />}
              </CardContent>
            </Card>
          }
        </Grid>
        {
          !!youtube && <Grid item xs={12}>
            <YoutubeCard youtube={youtube} />
          </Grid>
        }
      </Grid>
    )
  }
}

Tournament.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
  match: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { tournament, game } = state
  return {
    tournament,
    game
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Tournament)))

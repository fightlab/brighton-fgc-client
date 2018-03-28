import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Card, { CardContent } from 'material-ui/Card'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'

import { DateService } from '../../../_services'
import { tournamentActions } from '../../../_actions'

import EventCard from '../../../components/EventCard'
import GameCard from '../../../components/GameCard'
import PlayersCard from '../../../components/PlayersCard'

import StandingList from '../../../components/StandingsList'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
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
  box: {
    display: 'flex'
  }
})

class Tournament extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 0
    }

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange (event, index) {
    this.setState({ selectedTab: index })
  }

  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(tournamentActions.get(match.params.tournamentId))
  }

  render () {
    const { classes, tournament: tournamentObj } = this.props
    const { selectedTab } = this.state
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
      series = null
    } = tournament || {}

    return (
      <Grid
        container
        className={classes.container}
      >
        <Grid item xs={12}>
          <Typography variant='display1' component='h2'>
            {name && name}
          </Typography>
          <Typography variant='caption' gutterBottom>
            Last Updated - {updatedAt && DateService.format(updatedAt)}
          </Typography>
          <Typography variant='subheading' component='h4'>
            <b>Event Date:</b>
            <br />
            {dateStart && DateService.format(dateStart)} {
              dateEnd && <span> - {DateService.format(dateEnd)}</span>
            }
          </Typography>
          <br />
          <div className={classes.box}>
            <a style={{paddingRight: '4px'}} href={bracket && bracket} target='_blank' className='no-decor'>
              <Button dense='true' raised='true' color='primary'>
                Challonge Page
              </Button>
            </a>
            {
              dateStart && DateService.compareDates(dateStart, new Date().toISOString()) && <a style={{paddingLeft: '4px'}} href={signUpUrl && signUpUrl} target='_blank' className='no-decor'>
                <Button dense='true' raised='true' color='primary'>
                  Sign Up Page
                </Button>
              </a>
            }
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          { event && <EventCard event={event} /> }
        </Grid>
        <Grid item sm={6} xs={12}>
          { game && <GameCard game={game} /> }
        </Grid>
        <Grid item sm={6} xs={12}>
          { players && <PlayersCard players={players} /> }
        </Grid>
        <Grid item sm={6} xs={12} className={classes.cardGrid}>
          <AppBar position='static' color='default'>
            <Tabs
              value={selectedTab}
              onChange={this.handleTabChange}
              indicatorColor='primary'
              textColor='primary'
              fullWidth
            >
              <Tab label='Tournament Standings' />
              {/* <Tab label='Game' /> */}
              {!!series && <Tab label='Series Standings' />}
            </Tabs>
          </AppBar>
          {
            selectedTab === 0 && <Card className={classes.standingsCard} elevation={10}>
              <CardContent
                className={classes.standingsCardContent}
              >
                {id && <StandingList variant='tournament' id={id} />}
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
          {
            !!series && selectedTab === 1 && <Card className={classes.standingsCard} elevation={10}>
              <CardContent
                className={classes.standingsCardContent}
              >
                <StandingList variant='series' id={series.id} limit={16} />
              </CardContent>
            </Card>
          }
        </Grid>
        <Grid item xs={12}>
          <Card
            className={classes.card}
          >
            {
              bracket && <iframe src={`${bracket.replace('http://', 'https://')}/module?multiplier=1&match_width_multiplier=1&show_final_results=0&show_standings=0&theme=2&subdomain=`} style={{minHeight: '500px', width: '100%'}} frameBorder='0' scrolling='yes' />
            }
          </Card>
        </Grid>
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

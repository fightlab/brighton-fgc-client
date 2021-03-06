import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'
import { eventActions, tournamentActions, matchActions } from '../../_actions'
import { DateService } from '../../_services'

import BaseHomeCard from '../../components/BaseHomeCard'
import TournamentList from '../../components/TournamentList'
import EventList from '../../components/EventList'

const styles = theme => ({
  root: theme.mixins.gutters({
    background: 'url(https://res.cloudinary.com/mkn-sh/image/upload/c_lfill,h_720,w_1280/o_20,e_gradient_fade,y_-0.999/v1514624353/fgc/hbk.png) no-repeat center center fixed',
    backgroundColor: theme.palette.background.default,
    backgroundSize: 'cover',
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  }),
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  containerStats: {
    marginTop: 8,
    flexGrow: 1
  },
  paper: {
    padding: 16,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.appBar
  },
  media: {
    height: 75
  }
})

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange (event, index) {
    this.setState({ selectedTab: index })
  }

  componentDidMount () {
    const { dispatch } = this.props
    // get events and tournaments
    dispatch(eventActions.getAll(8))
    dispatch(tournamentActions.getAll(8))

    // get global stats
    dispatch(eventActions.getCount())
    dispatch(tournamentActions.getCount())
    dispatch(matchActions.getCount())
    dispatch(matchActions.getCountGames())
  }

  render () {
    const { classes, event, tournament, match } = this.props
    const { events = [], count: eventCount = 0 } = event
    const { tournaments = [], count: tournamentCount = 0 } = tournament
    const { count: matchCount = 0, countGames: matchCountGames = 0 } = match

    const nextEvents = orderBy(filter(events, event => DateService.compareDates(event.date, new Date().toISOString())), 'date', 'desc')
    const pastEvents = orderBy(filter(events, event => DateService.compareDates(new Date().toISOString(), event.date)), 'date', 'desc')

    const nextTournaments = orderBy(filter(tournaments, tournament => DateService.compareDates(tournament.dateStart, new Date().toISOString())), 'date', 'desc')
    const pastTournaments = orderBy(filter(tournaments, tournament => DateService.compareDates(new Date().toISOString(), tournament.dateStart)), 'date', 'desc')

    return (
      <Paper className={classes.root} elevation={0}>
        <Hidden mdUp>
          <Typography variant='h3' component='h1'>
            Habrewken
          </Typography>
          <Typography variant='h5' component='h2'>
            Brighton Fighting Game Community - Website and Resource
          </Typography>
        </Hidden>
        <Hidden smDown>
          <Typography variant='h1' component='h1'>
            Habrewken
          </Typography>
          <Typography variant='h4' component='h2'>
            Brighton Fighting Game Community - Website and Resource
          </Typography>
        </Hidden>
        <Grid spacing={16} container className={classes.container}>
          <Grid item md={6} sm={6} xs={12}>
            <BaseHomeCard title='Tournaments'>
              {
                !!nextTournaments.length && <TournamentList
                  height={nextTournaments.length * 100}
                  subheader='Upcoming'
                  tournaments={nextTournaments}
                  dense
                />
              }
              {
                !!pastTournaments.length && <TournamentList
                  height={pastTournaments.length * 100}
                  subheader='Past'
                  tournaments={pastTournaments}
                  dense
                />
              }
            </BaseHomeCard>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <BaseHomeCard title='Events'>
              {
                !!nextEvents.length && <EventList
                  height={nextEvents.length * 100}
                  subheader='Upcoming'
                  events={nextEvents}
                  dense
                />
              }
              {
                !!pastEvents.length && <EventList
                  height={pastEvents.length * 100}
                  subheader='Past'
                  events={pastEvents}
                  dense
                />
              }
            </BaseHomeCard>
          </Grid>
          <Grid item xs={12}>
            <BaseHomeCard title='Global Statistics'>
              <Grid spacing={16} container className={classes.containerStats}>
                <Grid item sm={3} xs={6}>
                  <Typography variant='h6' gutterBottom align='center'>
                    Events
                  </Typography>
                  <Typography variant='h4' gutterBottom align='center'>
                    {eventCount}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant='h6' gutterBottom align='center'>
                    Tournaments
                  </Typography>
                  <Typography variant='h4' gutterBottom align='center'>
                    {tournamentCount}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant='h6' gutterBottom align='center'>
                    Matches
                  </Typography>
                  <Typography variant='h4' gutterBottom align='center'>
                    {matchCount}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={6}>
                  <Typography variant='h6' gutterBottom align='center'>
                   Match Games
                  </Typography>
                  <Typography variant='h4' gutterBottom align='center'>
                    {matchCountGames}
                  </Typography>
                </Grid>
              </Grid>
            </BaseHomeCard>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const {
    event,
    tournament,
    match
  } = state

  return {
    event,
    tournament,
    match
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)))

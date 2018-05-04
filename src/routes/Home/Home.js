import React from 'react'
import { Typography, Paper, Hidden, Grid } from 'material-ui'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { filter, orderBy } from 'lodash'

// import Tabs, { Tab } from 'material-ui/Tabs'
// import AppBar from 'material-ui/AppBar'

import { eventActions, tournamentActions } from '../../_actions'
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

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(eventActions.getAll(4))
    dispatch(tournamentActions.getAll(4))
  }

  render () {
    const { classes, event, tournament } = this.props
    const { events = [] } = event
    const { tournaments = [] } = tournament

    const nextEvents = orderBy(filter(events, event => DateService.compareDates(event.date, new Date().toISOString())), 'date', 'desc')
    const pastEvents = orderBy(filter(events, event => DateService.compareDates(new Date().toISOString(), event.date)), 'date', 'desc')

    const nextTournaments = orderBy(filter(tournaments, tournament => DateService.compareDates(tournament.dateStart, new Date().toISOString())), 'date', 'desc')
    const pastTournaments = orderBy(filter(tournaments, tournament => DateService.compareDates(new Date().toISOString(), tournament.dateStart)), 'date', 'desc')

    return (
      <Paper className={classes.root} elevation={0}>
        <Hidden mdUp>
          <Typography variant='display2' component='h1'>
            Habrewken
          </Typography>
          <Typography variant='headline' component='h2'>
            Brighton Fighting Game Community - Website and Resource
          </Typography>
        </Hidden>
        <Hidden smDown>
          <Typography variant='display4' component='h1'>
            Habrewken
          </Typography>
          <Typography variant='display1' component='h2'>
            Brighton Fighting Game Community - Website and Resource
          </Typography>
        </Hidden>
        <Grid spacing={16} container className={classes.container}>
          <Grid item md={6} sm={6} xs={12}>
            <BaseHomeCard title='Tournaments'>
              {
                !!nextTournaments.length && <TournamentList
                  subheader='Upcoming'
                  tournaments={nextTournaments}
                  dense
                />
              }
              {
                !!pastTournaments.length && <TournamentList
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
                  subheader='Upcoming'
                  events={nextEvents}
                  dense
                />
              }
              {
                !!pastEvents.length && <EventList
                  subheader='Past'
                  events={pastEvents}
                  dense
                />
              }
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
  tournament: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const {
    event,
    tournament
  } = state

  return {
    event,
    tournament
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)))

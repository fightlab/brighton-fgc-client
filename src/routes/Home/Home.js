import React from 'react'
import { Typography, Paper, Hidden, Grid } from 'material-ui'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'

import { eventActions } from '../../_actions'

import EventCard from '../../components/EventCard'

import './Home.css'

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

    this.state = {
      selectedTab: 0
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange (event, index) {
    this.setState({ selectedTab: index })
  }

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(eventActions.getAll(4))
  }

  render () {
    const { classes, event } = this.props
    const { selectedTab } = this.state
    const { events } = event

    return (
      <Paper className={classes.root} elevation={0}>
        <Hidden mdUp>
          <Typography type='display2' component='h1'>
            Habrewken
          </Typography>
          <Typography type='headline' component='h2'>
            Brighton Fighting Game Community - Website and Resource
          </Typography>
        </Hidden>
        <Hidden smDown>
          <Typography type='display4' component='h1'>
            Habrewken
          </Typography>
          <Typography type='display1' component='h2'>
            Brighton Fighting Game Community - Website and Resource
          </Typography>
        </Hidden>
        <Grid container className={classes.container}>
          <Grid item md={6} sm={12} xs={12}>
            <AppBar position='static' color='default'>
              <Tabs
                value={0}
                // onChange={this.handleTabChange}
                indicatorColor='primary'
                textColor='primary'
                fullWidth
              >
                <Tab label='Latest Events' disabled />
              </Tabs>
            </AppBar>
            <Paper className={classes.paper} elevation={4}>
              <Grid container>
                {
                  events.map(event => (
                    <Grid item sm={6} xs={12} key={event.id}>
                      <EventCard event={event} />
                    </Grid>
                  ))
                }
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <AppBar position='static' color='default'>
              <Tabs
                value={0}
                // onChange={this.handleTabChange}
                indicatorColor='primary'
                textColor='primary'
                fullWidth
              >
                <Tab label='Series Standings' disabled />
              </Tabs>
            </AppBar>
            <AppBar position='static' color='default'>
              <Tabs
                value={selectedTab}
                onChange={this.handleTabChange}
                indicatorColor='primary'
                textColor='primary'
                fullWidth
              >
                <Tab label='Series Standings 1' />
                <Tab label='Series Standings 3' />
                <Tab label='Series Standings 2' />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { event } = state
  return {
    event
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)))

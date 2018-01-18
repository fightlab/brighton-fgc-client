import React from 'react'
import { Typography, Paper, Hidden, Grid } from 'material-ui'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { eventActions } from '../../_actions'

import EventCard from '../../components/EventCard'

import './Home.css'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
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
    color: theme.palette.text.secondary
  },
  media: {
    height: 75
  }
})

class Home extends React.Component {
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(eventActions.getAll(4))
  }

  render () {
    const { classes, event } = this.props
    console.log(classes)
    const { events } = event

    return (
      <Paper className={classes.root} elevation={0}>
        <Hidden smUp>
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
          <Grid item sm={6} xs={12}>
            <Paper className={classes.paper} elevation={4}>
              <Typography type='title' component='h3'>
            Latest Events
              </Typography>
              <Typography type='subheading' component='h4'>
            Habrewken
              </Typography>
              <Grid container className={classes.container}>
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
          <Grid item sm={6} xs={12}>
            <Paper className={classes.paper} elevation={4}>
              <Typography type='title' component='h3'>
            Current Standings
              </Typography>
              <Typography type='subheading' component='h4'>
            Street Fighter V - 2018 Series
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>Rank</TableCell>
                    <TableCell>Player</TableCell>
                    <TableCell numeric>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    [...Array(8)].map((v, i) => (
                      <TableRow key={i}>
                        <TableCell numeric>{i + 1}</TableCell>
                        <TableCell>
                          <Link className='no-decor' to={`/players/${i + 1}`}>Player {i + 1}</Link>
                        </TableCell>
                        <TableCell>10</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Paper>
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

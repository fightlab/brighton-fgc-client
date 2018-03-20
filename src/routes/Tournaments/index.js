import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Tournament from './Tournament'
import Root from './Root'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  })
})

const Tournaments = ({match, classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Typography variant='display2' component='h1'>
      Tournaments
    </Typography>
    <Route path={`${match.url}/:tournamentId`} component={Tournament} />
    <Route exact path={match.url} component={Root} />
  </Paper>
)

Tournaments.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Tournaments)

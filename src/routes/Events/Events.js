import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Event from './Event/Event'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  })
})

const Events = ({match, classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Typography type='display2' component='h1'>
      Events
    </Typography>
    <Route path={`${match.url}/:eventId`} component={Event} />
    <Route exact path={match.url} render={() => (
      <Typography type='body2' component='p'>
        Please Select A Event
      </Typography>
    )} />
  </Paper>
)

Events.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Events)

import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Root from './Root'
import Event from './Event'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  }),
  container: {
    flexGrow: 1,
    marginTop: 30
  }
})

class Events extends React.Component {
  render () {
    const { match, classes } = this.props

    return (
      <Paper className={classes.root} elevation={0}>
        <Typography variant='display2' component='h1'>
          Events
        </Typography>
        <Route path={`${match.url}/:eventId`} render={props => <Event {...props} />} />
        <Route exact path={match.url} component={Root} />
      </Paper>
    )
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Events)

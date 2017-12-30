import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Series from './Series/Series'

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

const Standings = ({match, classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Typography type='display2' component='h1'>
      Standings
    </Typography>
    <Route path={`${match.url}/:seriesId`} component={Series} />
    <Route exact path={match.url} render={() => (
      <Typography type='body2' component='p'>
        Please Select A Series
      </Typography>
    )} />
  </Paper>
)

Standings.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Standings)

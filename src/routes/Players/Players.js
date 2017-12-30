import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Player from './Player/Player'

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

const Players = ({match, classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Typography type='display2' component='h1'>
      Players
    </Typography>
    <Route path={`${match.url}/:playerId`} component={Player} />
    <Route exact path={match.url} render={() => (
      <Typography type='body2' component='p'>
        Please Select A Player
      </Typography>
    )} />
  </Paper>
)

Players.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Players)

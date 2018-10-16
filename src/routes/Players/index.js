import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Player from './Player'
import Root from './Root'
import PlayerGame from './PlayerGame'

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
    <Typography variant='display2' component='h1'>
      Players
    </Typography>
    <Route exact path={`${match.url}/:playerId`} component={Player} />
    <Route exact path={`${match.url}/:playerId/:gameId`} component={PlayerGame} />
    <Route exact path={match.url} component={Root} />
  </Paper>
)

Players.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Players)

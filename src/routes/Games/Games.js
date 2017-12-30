import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Game from './Game/Game'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    height: '100%'
  })
})

const Games = ({match, classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Typography type='display2' component='h1'>
      Games
    </Typography>
    <Route path={`${match.url}/:gameId`} component={Game} />
    <Route exact path={match.url} render={() => (
      <Typography type='body2' component='p'>
        Please Select A Game
      </Typography>
    )} />
  </Paper>
)

Games.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Games)

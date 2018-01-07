import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Root from './Root'
import Game from './Game'

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

class Games extends React.Component {
  render () {
    const { match, classes } = this.props
    return (
      <Paper className={classes.root} elevation={0}>
        <Typography type='display2' component='h1'>
          Games
        </Typography>
        <Route path={`${match.url}/:gameId`} component={Game} />
        <Route exact path={match.url} component={Root} />
      </Paper>
    )
  }
}

Games.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Games)

import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

import Home from './Home/Home'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    height: '100%'
  })
})

const Main = ({classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  </Paper>
)

Main.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Main)

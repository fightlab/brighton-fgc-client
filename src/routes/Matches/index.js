import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Route } from 'react-router-dom'

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

const Matches = ({ match, classes }) => (
  <Paper className={classes.root} elevation={0}>
    <Typography variant='h3' component='h1'>
      Matches
    </Typography>
    <Route exact path={match.url} component={Root} />
  </Paper>
)

Matches.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Matches)

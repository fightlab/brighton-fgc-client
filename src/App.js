import './App.css'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import Header from './components/Header/Header'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 0,
    height: '100%'
  })
})

const App = ({classes}) => (
  <div className='box'>
    <Header />
    <Paper className={classes.root} elevation={0}>
      <Typography type='headline' component='h3'>
        This is a sheet of paper.
      </Typography>
      <Typography type='body1' component='p'>
        Paper can be used to build surface or other elements for your application.
      </Typography>
    </Paper>
  </div>
)

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)

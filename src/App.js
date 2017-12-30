import './App.css'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import Header from './components/Header/Header'
import Main from './routes/Main'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    height: '100%'
  })
})

const App = ({classes}) => (
  <div className='box'>
    <Header />
    <Main />
  </div>
)

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)

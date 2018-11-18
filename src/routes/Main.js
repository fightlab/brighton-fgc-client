import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import AdminRoute from '../components/AdminRoute'
import LoggedInRoute from '../components/LoggedInRoute'

import Home from './Home/Home'
import Games from './Games'
import Events from './Events'
import Tournaments from './Tournaments'
import Players from './Players'
import Standings from './Standings'
import About from './About/About'
import Login from './Login'
import Matches from './Matches'
import Admin from './Admin'
import Profile from './Profile'

const Main = ({ isAuthenticated, isAdmin }) => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/games' component={Games} />
    <Route path='/events' component={Events} />
    <Route path='/tournaments' component={Tournaments} />
    <Route path='/players' component={Players} />
    <Route path='/standings' component={Standings} />
    <Route path='/about' component={About} />
    <Route path='/matches' component={Matches} />
    <Route path='/login' component={Login} />
    <LoggedInRoute path='/profile' component={Profile} isAuthenticated={isAuthenticated} />
    <AdminRoute path='/admin' isAdmin={isAdmin} component={Admin} />
  </Switch>
)

Main.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default Main

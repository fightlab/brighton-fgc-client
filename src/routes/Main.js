import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminRoute from '../components/AdminRoute'

import Home from './Home/Home'
import Games from './Games'
import Events from './Events'
import Tournaments from './Tournaments'
import Players from './Players/Players'
import Standings from './Standings'
import About from './About/About'
import Login from './Login'
import Admin from './Admin'

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/games' component={Games} />
    <Route path='/events' component={Events} />
    <Route path='/tournaments' component={Tournaments} />
    <Route path='/players' component={Players} />
    <Route path='/standings' component={Standings} />
    <Route path='/about' component={About} />
    <Route path='/login' component={Login} />
    <AdminRoute path='/admin' component={Admin} />
  </Switch>
)

export default Main

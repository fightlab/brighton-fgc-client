import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import Games from './Games/Games'
import Events from './Events/Events'
import Tournaments from './Tournaments/Tournaments'
import Players from './Players/Players'
import Standings from './Standings/Standings'
import About from './About/About'

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/games' component={Games} />
    <Route path='/events' component={Events} />
    <Route path='/tournaments' component={Tournaments} />
    <Route path='/players' component={Players} />
    <Route path='/standings' component={Standings} />
    <Route path='/about' component={About} />
  </Switch>
)

export default Main

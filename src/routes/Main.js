import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import Games from './Games/Games'

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/games' component={Games} />
  </Switch>
)

export default Main

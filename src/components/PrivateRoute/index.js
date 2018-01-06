import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    cookies.get('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.any
}

export default PrivateRoute

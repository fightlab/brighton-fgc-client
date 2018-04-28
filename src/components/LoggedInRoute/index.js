import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const LoggedInRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
)

LoggedInRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.any.isRequired,
  location: PropTypes.any
}

export default LoggedInRoute

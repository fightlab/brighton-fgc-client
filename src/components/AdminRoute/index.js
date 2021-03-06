import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route {...rest} render={props => (
    isAdmin
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
)

AdminRoute.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  component: PropTypes.any.isRequired,
  location: PropTypes.any
}

export default AdminRoute

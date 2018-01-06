import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { get } from 'lodash'

const cookies = new Cookies()

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    get(cookies.get('user'), 'role') === 'admin'
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

AdminRoute.propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.any
}

export default AdminRoute

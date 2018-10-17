import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LogoutVariantIcon from 'mdi-material-ui/LogoutVariant'
import { withRouter } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

class Logout extends Component {
  render () {
    const { dispatch, onLogoutClick, history } = this.props

    return (
      <ListItem button onClick={() => dispatch(onLogoutClick(history))}>
        <ListItemIcon>
          <LogoutVariantIcon />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItem>
    )
  }
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default withRouter(Logout)

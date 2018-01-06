import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LogoutVariantIcon from 'mdi-material-ui/LogoutVariant'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

class Logout extends Component {
  render () {
    const { dispatch, onLogoutClick } = this.props

    return (
      <div>
        <ListItem button onClick={() => dispatch(onLogoutClick())}>
          <ListItemIcon>
            <LogoutVariantIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </div>
    )
  }
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Logout

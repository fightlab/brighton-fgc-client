import React from 'react'
import LoginVariantIcon from 'mdi-material-ui/LoginVariant'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'

export default () => (
  <ListItem button component={Link} to='/login'>
    <ListItemIcon>
      <LoginVariantIcon />
    </ListItemIcon>
    <ListItemText primary='Login' />
  </ListItem>
)

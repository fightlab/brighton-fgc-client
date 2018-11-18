import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import PeopleIcon from '@material-ui/icons/People'
import InfoIcon from '@material-ui/icons/Info'
import DateRangeIcon from '@material-ui/icons/DateRange'
import WebIcon from '@material-ui/icons/Web'
import PersonOutline from '@material-ui/icons/PersonOutline'
import SwordCrossIcon from 'mdi-material-ui/SwordCross'
import TournamentIcon from 'mdi-material-ui/Tournament'

export const topListItems = (
  <div>
    <ListItem button component={Link} to='/'>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary='Home' />
    </ListItem>
    <ListItem button component={Link} to='/about'>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary='About' />
    </ListItem>
  </div>
)

export const otherListItems = (
  <div>
    <ListItem button component={Link} to='/events'>
      <ListItemIcon>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary='Events' />
    </ListItem>
    <ListItem button component={Link} to='/tournaments'>
      <ListItemIcon>
        <TournamentIcon />
      </ListItemIcon>
      <ListItemText primary='Tournaments' />
    </ListItem>
    <ListItem button component={Link} to='/players'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Players' />
    </ListItem>
    <ListItem button component={Link} to='/games'>
      <ListItemIcon>
        <VideogameAssetIcon />
      </ListItemIcon>
      <ListItemText primary='Games' />
    </ListItem>
    <ListItem button component={Link} to='/matches'>
      <ListItemIcon>
        <SwordCrossIcon />
      </ListItemIcon>
      <ListItemText primary='Matches' />
    </ListItem>
  </div>
)

export const adminItem = (
  <div>
    <ListItem button component={Link} to='/admin'>
      <ListItemIcon>
        <WebIcon />
      </ListItemIcon>
      <ListItemText primary='Admin' />
    </ListItem>
  </div>
)

export const loggedInItems = (
  <div>
    <ListItem button component={Link} to='/profile'>
      <ListItemIcon>
        <PersonOutline />
      </ListItemIcon>
      <ListItemText primary='Profile' />
    </ListItem>
  </div>
)

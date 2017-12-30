import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import HomeIcon from 'material-ui-icons/Home'
import VideogameAssetIcon from 'material-ui-icons/VideogameAsset'
import StarsIcom from 'material-ui-icons/Stars'
import PeopleIcon from 'material-ui-icons/People'
import InfoOutlineIcon from 'material-ui-icons/InfoOutline'
import DateRangeIcon from 'material-ui-icons/DateRange'
import AssessmentIcon from 'material-ui-icons/Assessment'

export const topListItems = (
  <div>
    <ListItem button component={Link} to='/'>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary='Home' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InfoOutlineIcon />
      </ListItemIcon>
      <ListItemText primary='About' />
    </ListItem>
  </div>
)

export const otherListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primary='Events' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarsIcom />
      </ListItemIcon>
      <ListItemText primary='Tournaments' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary='Standings' />
    </ListItem>
    <ListItem button>
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
  </div>
)

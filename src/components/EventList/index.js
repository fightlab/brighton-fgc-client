import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import deepOrange from '@material-ui/core/colors/deepOrange'
import Scrollbar from 'react-scrollbars-custom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { DateService } from '../../_services'

const styles = theme => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    padding: 0
  },
  orange: {
    backgroundColor: deepOrange[400]
  },
  scroll: {
    width: '100%',
    maxWidth: '100%'
  }
})

class EventList extends React.Component {
  render () {
    const { classes, subheader, dense = false, height = 400 } = this.props
    let { events = [] } = this.props
    events = orderBy(events, ['date'], ['desc'])

    return (
      <Scrollbar style={{ minHeight: Math.min(height, 400) }} className={classes.scroll}>
        <List
          className={classes.list}
          subheader={!!subheader && <ListSubheader component='div'>{subheader}</ListSubheader>}
          dense={dense}
        >
          {
            !!events.length && map(events, (event, index) => (
              <ListItem button key={event._id || event.id} component={Link} to={`/events/${event._id || event.id}`}>
                <ListItemText
                  primary={event.name}
                  secondary={event.date && DateService.format(event.date, 'DATE_HUGE')}
                />
              </ListItem>
            ))
          }
        </List>
      </Scrollbar>
    )
  }
}

EventList.propTypes = {
  dense: PropTypes.bool,
  subheader: PropTypes.string,
  classes: PropTypes.object.isRequired,
  events: PropTypes.array,
  height: PropTypes.number
}

export default withStyles(styles)(EventList)

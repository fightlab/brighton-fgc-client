import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { map, orderBy } from 'lodash'
import deepOrange from 'material-ui/colors/deepOrange'

import List, {
  ListItem,
  ListItemText,
  ListSubheader
} from 'material-ui/List'
import { DateService } from '../../_services'

const styles = theme => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 460,
    padding: 0
  },
  orange: {
    backgroundColor: deepOrange[400]
  }
})

class EventList extends React.Component {
  render () {
    const { classes, subheader, dense = false } = this.props
    let { events = [] } = this.props
    events = orderBy(events, ['date'], ['desc'])

    return (
      <List
        className={classes.list}
        subheader={!!subheader && <ListSubheader component='div'>{subheader}</ListSubheader>}
        dense={dense}
      >
        {
          events.length && map(events, (event, index) => (
            <ListItem button key={event._id || event.id} component={Link} to={`/events/${event._id || event.id}`}>
              <ListItemText
                primary={event.name}
                secondary={event.date && DateService.format(event.date, 'DATE_HUGE')}
              />
            </ListItem>
          ))
        }
      </List>
    )
  }
}

EventList.propTypes = {
  dense: PropTypes.bool,
  subheader: PropTypes.string,
  classes: PropTypes.object.isRequired,
  events: PropTypes.array
}

export default withStyles(styles)(EventList)

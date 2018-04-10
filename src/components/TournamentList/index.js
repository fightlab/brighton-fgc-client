import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { map, orderBy } from 'lodash'
import deepOrange from 'material-ui/colors/deepOrange'

import List, {
  ListItem,
  ListItemText
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

class TournamentList extends React.Component {
  render () {
    const { classes } = this.props
    let { tournaments = [] } = this.props
    tournaments = orderBy(tournaments, ['dateStart'], ['desc'])

    return (
      <List className={classes.list} >
        {
          tournaments.length && map(tournaments, (tournament, index) => (
            <ListItem button key={tournament._id} component={Link} to={`/tournaments/${tournament._id}`}>
              <ListItemText
                primary={tournament.name}
                secondary={tournament.dateStart && DateService.format(tournament.dateStart, 'DATE_HUGE')}
              />
            </ListItem>
          ))
        }
      </List>
    )
  }
}

TournamentList.propTypes = {
  classes: PropTypes.object.isRequired,
  tournaments: PropTypes.array
}

export default withStyles(styles)(TournamentList)

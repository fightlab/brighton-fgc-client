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

class TournamentList extends React.Component {
  render () {
    const { classes, subheader, dense = false } = this.props
    let { tournaments = [] } = this.props
    tournaments = orderBy(tournaments, ['dateStart'], ['desc'])

    return (
      <List
        className={classes.list}
        subheader={!!subheader && <ListSubheader component='div'>{subheader}</ListSubheader>}
        dense={dense}
      >
        {
          tournaments.length && map(tournaments, (tournament, index) => (
            <ListItem button key={tournament._id || tournament.id} component={Link} to={`/tournaments/${tournament._id || tournament.id}`}>
              <ListItemText
                primary={`${tournament.name}`}
                secondary={`${tournament.game ? `${tournament.game.name} - ` : ''}${tournament._gameId ? `${tournament._gameId.name} - ` : ''}${tournament.dateStart && DateService.format(tournament.dateStart, 'DATE_HUGE')}`}
              />
            </ListItem>
          ))
        }
      </List>
    )
  }
}

TournamentList.propTypes = {
  dense: PropTypes.bool,
  subheader: PropTypes.string,
  classes: PropTypes.object.isRequired,
  tournaments: PropTypes.array
}

export default withStyles(styles)(TournamentList)

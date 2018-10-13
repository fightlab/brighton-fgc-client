import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import deepOrange from 'material-ui/colors/deepOrange'
import Scrollbar from 'react-scrollbars-custom'

import List, {
  ListItem,
  ListItemText,
  ListSubheader
} from 'material-ui/List'
import { DateService, MetaService } from '../../_services'

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
    maxWidth: '100%',
    minHeight: 400
  }
})

class TournamentList extends React.Component {
  getSecondary (tournament, showGame, detailed) {
    if (!detailed) {
      return `${tournament.game && showGame ? `${tournament.game.name} - ` : ''}${tournament._gameId && showGame ? `${tournament._gameId.name} - ` : ''}${tournament.dateStart && DateService.format(tournament.dateStart, 'DATE_HUGE')}`
    }

    return `${tournament.game && showGame ? `${tournament.game.name} | ` : ''}${tournament._gameId && showGame ? `${tournament._gameId.name} | ` : ''}${tournament.dateStart && DateService.format(tournament.dateStart, 'DATE_MED')} | ${DateService.format(tournament.dateStart, 'TIME_SIMPLE')} - ${tournament.dateEnd ? DateService.format(tournament.dateEnd, 'TIME_SIMPLE') : 'N/A'} | ${tournament.players.length} Players | ${MetaService.toTitleCase(tournament.type)}${tournament.youtube ? ' | VOD' : ''}`
  }

  render () {
    const { classes, subheader, dense = false, showGame = true, detailed = false } = this.props
    let { tournaments = [] } = this.props
    tournaments = orderBy(tournaments, ['dateStart'], ['desc'])

    return (
      <Scrollbar className={classes.scroll}>
        <List
          className={classes.list}
          subheader={!!subheader && <ListSubheader component='div'>{subheader}</ListSubheader>}
          dense={dense}
        >
          {
            !!tournaments.length && map(tournaments, (tournament, index) => (
              <ListItem button key={tournament._id || tournament.id} component={Link} to={`/tournaments/${tournament._id || tournament.id}`}>
                <ListItemText
                  primary={`${tournament.name}`}
                  secondary={this.getSecondary(tournament, showGame, detailed)}
                />
              </ListItem>
            ))
          }
        </List>
      </Scrollbar>
    )
  }
}

TournamentList.propTypes = {
  showGame: PropTypes.bool,
  detailed: PropTypes.bool,
  dense: PropTypes.bool,
  subheader: PropTypes.string,
  classes: PropTypes.object.isRequired,
  tournaments: PropTypes.array
}

export default withStyles(styles)(TournamentList)

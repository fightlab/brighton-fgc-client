import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { map } from 'lodash'
import deepOrange from 'material-ui/colors/deepOrange'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { tournamentActions, gameActions, seriesActions } from '../../_actions'

const styles = theme => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 460
  },
  orange: {
    backgroundColor: deepOrange[400]
  }
})

class StandingsList extends React.Component {
  componentWillMount () {
    const { variant = '', id = '', dispatch, limit } = this.props
    if (id) {
      switch (variant) {
        case 'tournament':
          dispatch(tournamentActions.getStandings(id))
          break
        case 'game':
          dispatch(gameActions.getStandings(id, limit))
          break
        case 'series':
          dispatch(seriesActions.getStandings(id, limit))
          break
        default:
          break
      }
    }
  }

  render () {
    const { classes, variant, tournament = {}, game = {}, series = {} } = this.props
    let standings = []

    switch (variant) {
      case 'tournament':
        standings = tournament.standings || []
        break
      case 'game':
        standings = game.standings || []
        break
      case 'series':
        standings = series.standings || []
        break
      default:
        break
    }

    return (
      <List className={classes.list} dense='true'>
        {
          standings && map(standings, (standing, index) => (
            <ListItem button key={standing.id} >
              <ListItemAvatar>
                <Avatar
                  alt={standing._playerId.handle}
                  src={`https://www.gravatar.com/avatar/${standing._playerId.emailHash}?d=robohash`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={standing._playerId.handle}
              />
              {
                standing.rank && <ListItemSecondaryAction>
                  <Avatar className={index < 4 && classes.orange}>
                    {standing.rank || ''}
                  </Avatar>
                </ListItemSecondaryAction>
              }
            </ListItem>
          ))
        }
      </List>
    )
  }
}

StandingsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  limit: PropTypes.number
}

const mapStateToProps = state => {
  const { tournament, game, series } = state

  return {
    tournament,
    game,
    series
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(StandingsList)))

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import map from 'lodash/map'
import isNumber from 'lodash/isNumber'
import deepOrange from '@material-ui/core/colors/deepOrange'
import Scrollbar from 'react-scrollbars-custom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'

import { tournamentActions, gameActions, seriesActions } from '../../_actions'
import { MetaService } from '../../_services'

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

class StandingsList extends React.Component {
  constructor (props) {
    super(props)

    this.getImage = MetaService.getImage
  }

  componentDidMount () {
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
      <Scrollbar className={classes.scroll}>
        <List className={classes.list} dense>
          {
            !!standings.length && map(standings, (standing, index) => (
              <ListItem button key={standing.id} component={Link} to={`/players/${standing._playerId.id}`}>
                <ListItemAvatar>
                  <Avatar
                    alt={standing._playerId.handle}
                    src={this.getImage(standing._playerId)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={standing._playerId.handle}
                />
                {
                  isNumber(standing.rank) && <ListItemSecondaryAction>
                    <Avatar className={index < 4 ? classes.orange : ''}>
                      {standing.rank.toString() || ''}
                    </Avatar>
                  </ListItemSecondaryAction>
                }
              </ListItem>
            ))
          }
        </List>
      </Scrollbar>
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

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import map from 'lodash/map'
import isNumber from 'lodash/isNumber'
import deepOrange from 'material-ui/colors/deepOrange'
import Typography from 'material-ui/Typography'

import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { gameActions } from '../../_actions'

const styles = theme => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    color: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 460,
    padding: 0
  },
  orange: {
    color: deepOrange[400]
  }
})

class EloList extends React.Component {
  getImage (player) {
    if (player.imageUrl) return player.imageUrl
    return `https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`
  }

  componentWillMount () {
    const { id = '', dispatch } = this.props

    dispatch(gameActions.getElo(id))
  }

  render () {
    const { classes, game: { elo = [] } } = this.props

    return (
      <List className={classes.list} dense>
        {
          elo.length && map(elo, (e, index) => (
            <ListItem button key={e.id} component={Link} to={`/players/${e.player.id}`}>
              <ListItemAvatar>
                <Avatar
                  alt={e.player.handle}
                  src={this.getImage(e.player)}
                />
              </ListItemAvatar>
              <ListItemText
                primary={e.player.handle}
                secondary={`Matches Ranked: ${e.matches}`}
              />
              {
                isNumber(e.elo) && <ListItemSecondaryAction>
                  <Typography variant='headline' className={index < 4 ? classes.orange : ''}>
                    {e.elo.toString() || ''}
                  </Typography>
                </ListItemSecondaryAction>
              }
            </ListItem>
          ))
        }
      </List>
    )
  }
}

EloList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { tournament, game, series } = state

  return {
    tournament,
    game,
    series
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(EloList)))

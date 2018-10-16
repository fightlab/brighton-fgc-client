import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import map from 'lodash/map'
import isNumber from 'lodash/isNumber'
import Typography from 'material-ui/Typography'
import Scrollbar from 'react-scrollbars-custom'

import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { playerActions } from '../../_actions'

const styles = theme => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    padding: 0
  },
  scroll: {
    width: '100%',
    maxWidth: '100%',
    minHeight: 400
  }
})

class PlayerEloList extends React.Component {
  componentWillMount () {
    const { id = '', dispatch } = this.props

    dispatch(playerActions.getElo(id))
  }

  render () {
    const { classes, player: { elo = [] } } = this.props

    return (
      <Scrollbar className={classes.scroll}>
        <List className={classes.list} dense>
          {
            !!elo.length && map(elo, (e, index) => (
              <ListItem button key={e.id} component={Link} to={`/players/${e.player}/${e.game.id}`}>
                <ListItemAvatar>
                  <Avatar
                    alt={e.game.name}
                    src={e.game.imageUrl}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={e.game.name}
                  secondary={`Matches Ranked: ${e.matches}`}
                />
                {
                  isNumber(e.elo) && <ListItemSecondaryAction>
                    <Typography variant='headline'>
                      {e.elo.toString() || ''}
                    </Typography>
                  </ListItemSecondaryAction>
                }
              </ListItem>
            ))
          }
          {
            !elo.length && (
              <ListItem>
                <ListItemText
                  primary='No Elo Ranking Found'
                />
              </ListItem>
            )
          }
        </List>
      </Scrollbar>
    )
  }
}

PlayerEloList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { player } = state

  return {
    player
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PlayerEloList)))

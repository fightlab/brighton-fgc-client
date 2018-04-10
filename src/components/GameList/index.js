import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { map, orderBy } from 'lodash'
import deepOrange from 'material-ui/colors/deepOrange'

import List, {
  ListItem,
  ListItemAvatar,
  ListItemText
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

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

class GameList extends React.Component {
  render () {
    const { classes } = this.props
    let { games = [] } = this.props
    games = orderBy(games, ['name'], ['asc'])

    return (
      <List className={classes.list} >
        {
          games.length && map(games, (game, index) => (
            <ListItem button key={game._id} component={Link} to={`/games/${game._id}`}>
              <ListItemAvatar>
                <Avatar
                  alt={game.name}
                  src={game.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={game.name}
              />
            </ListItem>
          ))
        }
      </List>
    )
  }
}

GameList.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.array
}

export default withStyles(styles)(GameList)

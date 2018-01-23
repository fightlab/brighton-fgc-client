import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { orderBy, map } from 'lodash'
// import { Link } from 'react-router-dom'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    flexGrow: 1
  },
  cardContent: {
    flexGrow: 1
  },
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 450
  }
})

class PlayersCard extends React.Component {
  render () {
    const { players, classes } = this.props
    console.log(players)
    return (
      <Card className={classes.card} elevation={10}>
        <CardHeader
          title='Players'
          className={classes.cardHeader}
        />
        <CardContent
          className={classes.cardContent}
        >
          <List className={classes.list} dense>
            {
              players && map(orderBy(players, p => p.handle.toLowerCase(), 'asc'), player => (
                <ListItem button key={player.id}>
                  <ListItemAvatar>
                    <Avatar
                      alt={player.handle}
                      src={`https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={player.handle}
                  />
                </ListItem>
              ))
            }
          </List>
        </CardContent>
      </Card>
    )
  }
}

PlayersCard.propTypes = {
  players: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PlayersCard)

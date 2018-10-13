import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import { Link } from 'react-router-dom'
import Scrollbar from 'react-scrollbars-custom'

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
    flexGrow: 1,
    padding: '0 !important'
  },
  scroll: {
    width: '100%',
    maxWidth: '100%',
    minHeight: 400
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    padding: 0
  }
})

class PlayersCard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 0
    }
  }

  getImage (player) {
    if (player.imageUrl) return player.imageUrl
    return `https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`
  }

  render () {
    const { players, classes } = this.props

    const { selectedTab } = this.state

    return (
      <div style={{width: 'inherit', height: 'inherit'}}>
        <AppBar position='static' color='default'>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            fullWidth
          >
            <Tab label='Players' />
          </Tabs>
          {
            selectedTab === 0 && <Card className={classes.card} elevation={10}>
              <CardContent
                className={classes.cardContent}
              >
                <Scrollbar className={classes.scroll}>
                  <List className={classes.list} dense>
                    {
                      players && map(orderBy(players, p => p.handle.toLowerCase(), 'asc'), player => (
                        <ListItem button key={player.id} component={Link} to={`/players/${player.id}`}>
                          <ListItemAvatar>
                            <Avatar
                              alt={player.handle}
                              src={this.getImage(player)}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={player.handle}
                          />
                        </ListItem>
                      ))
                    }
                  </List>
                </Scrollbar>
              </CardContent>
            </Card>
          }
        </AppBar>
      </div>
    )
  }
}

PlayersCard.propTypes = {
  players: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PlayersCard)

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import { Link } from 'react-router-dom'
import Scrollbar from 'react-scrollbars-custom'

import { MetaService } from '../../_services'

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
    this.getImage = MetaService.getImage
  }

  render () {
    const { players, classes } = this.props

    const { selectedTab } = this.state

    return (
      <div style={{ width: 'inherit', height: 'inherit' }}>
        <AppBar position='static' color='default'>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
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

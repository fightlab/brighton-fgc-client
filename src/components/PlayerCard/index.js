import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
// import Grid from 'material-ui/Grid'
import Card, { CardActions, /* CardContent, */ CardHeader } from 'material-ui/Card'
// import { Typography } from 'material-ui'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'

// import { MetaService } from '../../_services'

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
  cardActions: {
    flexGrow: 1
  }
})

class PlayerCard extends React.Component {
  render () {
    const { player, classes } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt={player.handle}
              src={`https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`}
            />
          }
          className={classes.cardHeader}
          title={player.handle}
          subheader={player.isStaff ? 'Habrewken Staff' : ''}
        />
        <CardActions className={classes.cardActions}>
          <Button dense='true' color='primary' component={Link} to={`/players/${player.id}`}>
            View Player
          </Button>
        </CardActions>
      </Card>
    )
  }
}

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PlayerCard)

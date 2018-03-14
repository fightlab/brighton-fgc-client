import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import { Typography } from 'material-ui'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    flexGrow: 1,
    height: 200,
    backgroundSize: 'contain'
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    flexGrow: 1
  }
})

class GameCard extends React.Component {
  render () {
    const { game, classes } = this.props
    return (
      <Card className={classes.card} elevation={10}>
        <CardMedia
          className={classes.media}
          image={game.imageUrl}
          title={game.name}
        />
        <CardContent
          className={classes.cardContent}
        >
          <Typography type='headline' component='h2'>
            {game.name}
          </Typography>
        </CardContent>
        <CardActions
          className={classes.cardActions}
        >
          <Button dense='true' color='primary' component={Link} to={`/games/${game.id}`}>
            View Game
          </Button>
        </CardActions>
      </Card>
    )
  }
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GameCard)

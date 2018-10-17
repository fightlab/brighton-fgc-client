import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
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
          <Typography variant='h5' component='h2'>
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

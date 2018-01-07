import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { orderBy } from 'lodash'
import { Link } from 'react-router-dom'
import { GameService } from '../../_services'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    width: '100%'
  },
  media: {
    height: 200,
    backgroundSize: 'contain'
  }
})

class Root extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      games: []
    }
  }

  componentWillMount () {
    GameService
      .getAll()
      .then(games => {
        games = orderBy(games, 'name')
        this.setState({ games })
      })
      .catch(error => this.setState({ error }))
  }

  render () {
    const { classes } = this.props
    const { games } = this.state

    return (
      <Grid container className={classes.container}>
        {
          games.map(game => (
            <Grid item xs={12} sm={4} lg={3} key={game.id}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={game.imageUrl}
                  title={game.name}
                />
                <CardContent>
                  <Typography type='headline' component='h2'>
                    {game.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button dense color='primary' component={Link} to={`/games/${game.id}`}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    )
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Root)

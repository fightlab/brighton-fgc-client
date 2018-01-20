import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { orderBy } from 'lodash'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { gameActions } from '../../_actions'

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
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(gameActions.getAll())
  }

  render () {
    const { classes, game } = this.props
    const games = orderBy(game.games, 'name', 'asc')

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
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { game } = state
  return {
    game
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Root)))

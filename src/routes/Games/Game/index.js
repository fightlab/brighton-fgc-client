import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

import { GameService } from '../../../_services'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  }
})

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      game: {}
    }
  }

  componentWillMount () {
    const { match } = this.props

    GameService
      .get(match.params.gameId)
      .then(game => this.setState({ game }))
      .catch(error => this.setState({ error }))
  }

  render () {
    const { game } = this.state

    return (
      <Typography type='title' component='h3'>
        {game.name}
      </Typography>
    )
  }
}

Game.propTypes = {
  match: PropTypes.any.isRequired
}

export default withStyles(styles)(Game)

import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'

import Root from './Root'
import Game from './Game'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  }),
  container: {
    flexGrow: 1,
    marginTop: 30
  }
})

class Games extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bg: {}
    }

    this.setBg = this.setBg.bind(this)
  }

  setBg (url) {
    let { bg } = this.state
    bg = url ? { background: `url(${url}) no-repeat center center fixed`, backgroundSize: 'cover' } : {}
    this.setState({ bg })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.isExact) {
      this.setBg('')
    }
  }

  render () {
    const { match, classes } = this.props
    const { bg } = this.state

    return (
      <Paper style={bg} className={classes.root} elevation={0}>
        <Typography type='display2' component='h1'>
          Games
        </Typography>
        <Route path={`${match.url}/:gameId`} render={props => <Game {...props} setBg={this.setBg} />} />
        <Route exact path={match.url} component={Root} />
      </Paper>
    )
  }
}

Games.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

export default withStyles(styles)(Games)

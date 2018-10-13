import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import get from 'lodash/get'

import Tournament from './Tournament'
import Root from './Root'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    backgroundSize: 'cover !important',
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  })
})

class Tournaments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bg: {}
    }

    this.setBg = this.setBg.bind(this)
  }

  setBg (url = '') {
    let { bg } = this.state
    bg = url ? { background: `url(${url}) no-repeat center center fixed` } : {}
    this.setState({ bg })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.isExact) {
      this.setBg('')
    } else {
      this.setBg(get(nextProps, 'tournament.tournament._gameId.bgUrl', ''))
    }
  }

  render () {
    const { bg } = this.state
    const { match, classes } = this.props
    return (
      <Paper style={bg} className={classes.root} elevation={0}>
        <Typography variant='display2' component='h1'>
          Tournaments
        </Typography>
        <Route path={`${match.url}/:tournamentId`} component={Tournament} />
        <Route exact path={match.url} component={Root} />
      </Paper>
    )
  }
}

Tournaments.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.any
}

const mapStateToProps = state => {
  const { tournament } = state
  return {
    tournament
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Tournaments)))

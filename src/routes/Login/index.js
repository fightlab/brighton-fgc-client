import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { userActions } from '../../_actions'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  })
})

class Login extends React.Component {
  componentWillMount () {
    const { dispatch, history } = this.props
    const { location } = history
    const { hash = '' } = location

    if (/access_token|id_token|error/.test(hash)) {
      dispatch(userActions.handleAuth())
    }
  }

  render () {
    const { isAuthenticated, classes } = this.props
    return (
      <Paper className={classes.root} elevation={0}>
        {isAuthenticated && (
          <Redirect to={'/'} />
        )}
      </Paper>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    isAuthenticated: auth.isAuthenticated
  }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Login)))

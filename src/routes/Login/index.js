import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import qs from 'qs'
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
    console.log(this.props)
    const { dispatch, history } = this.props
    const { location } = history
    const { hash = '' } = location
    const query = qs.parse(hash.replace('#', ''))
    console.log(query)
    if (/access_token|id_token|error/.test(hash)) {
      dispatch(userActions.handleAuth(history))
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
  console.log(state)
  const { auth } = state
  return {
    isAuthenticated: auth.isAuthenticated
  }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Login)))

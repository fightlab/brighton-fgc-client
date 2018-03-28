import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper, Card, Button } from 'material-ui'
import { CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
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
  }),
  card: {
    maxWidth: 345,
    textAlign: 'center'
  }
})

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.processForm = this.processForm.bind(this)
  }

  handleChange (event) {
    const field = event.target.name
    const user = this.state.user
    user[field] = event.target.value
    this.setState({ user })
  }

  processForm (event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(userActions.login(this.state.user))
  }

  render () {
    const { isAuthenticated, errorCode, errorMessage, classes } = this.props
    console.log(errorCode)
    console.log(errorMessage)
    return (
      <Paper className={classes.root} elevation={0}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='title' component='h1'>
              Login
            </Typography>
            <form name='form' onSubmit={this.processForm} noValidate>
              <br />
              <TextField
                name='email'
                id='email'
                label='Email'
                variant='text'
                autoComplete='username email'
                margin='normal'
                onChange={this.handleChange}
              />
              <br />
              <TextField
                name='password'
                id='password'
                label='Password'
                variant='password'
                autoComplete='current-password'
                margin='normal'
                onChange={this.handleChange}
              />
              <br />
              <Button raised='true' color='primary' variant='submit'>
              Login
              </Button>
            </form>
          </CardContent>
        </Card>
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
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.any,
  errorCode: PropTypes.any
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    isAuthenticated: auth.isAuthenticated,
    errorMessage: auth.errorMessage,
    errorCode: auth.errorCode
  }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Login)))

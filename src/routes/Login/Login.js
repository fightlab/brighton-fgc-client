import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper, Card, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

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
  }

  render () {
    const { classes } = this.props
    return (
      <Paper className={classes.root} elevation={0}>
        <Card>
          <Typography type='title' component='h1'>
            Login
          </Typography>
          <form name='form' onSubmit={this.processForm} noValidate>
            <br />
            <TextField
              name='email'
              id='email'
              label='Email'
              type='text'
              autoComplete='username email'
              margin='normal'
              onChange={this.handleChange}
            />
            <br />
            <TextField
              name='password'
              id='password'
              label='Password'
              type='password'
              autoComplete='current-password'
              margin='normal'
              onChange={this.handleChange}
            />
            <br />
            <Button raised color='primary' type='submit'>
              Login
            </Button>
          </form>
        </Card>
      </Paper>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)

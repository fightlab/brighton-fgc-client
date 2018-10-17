import React from 'react'
import PropTypes from 'prop-types'
import LoginVariantIcon from 'mdi-material-ui/LoginVariant'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions } from '../../_actions'
// import { Link } from 'react-router-dom'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(userActions.login())
  }

  render () {
    return (
      //  <ListItem button component={Link} to='/login'>
      <ListItem button onClick={this.handleClick}>
        <ListItemIcon>
          <LoginVariantIcon />
        </ListItemIcon>
        <ListItemText primary='Login' />
      </ListItem>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    auth
  }
}

export default withRouter(connect(mapStateToProps)(Login))

import React from 'react'
import PropTypes from 'prop-types'
import LoginVariantIcon from 'mdi-material-ui/LoginVariant'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
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
    dispatch(userActions.newLogin())
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

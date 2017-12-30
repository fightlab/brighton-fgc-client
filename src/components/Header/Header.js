import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Header extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <AppBar position='static'>
        <Toolbar>
          <IconButton className={this.props.classes.menuButton} color='contrast' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography type='title' color='inherit' className={this.props.classes.flex}>
            Brighton FGC
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)

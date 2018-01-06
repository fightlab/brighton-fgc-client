import './App.css'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Drawer, Hidden, Divider } from 'material-ui'
import List from 'material-ui/List'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// actions
import { userActions } from './_actions'

// components
import { topListItems, otherListItems } from './components/NavItems/NavItems'
import Header from './components/Header/Header'
import Logout from './components/Logout'
import Login from './components/Login'

// routes
import Main from './routes/Main'

const drawerWidth = 240
const styles = theme => ({
  root: {
    width: '100%',
    height: 'inherit',
    zIndex: 1
  },
  home: {
    textDecoration: 'none'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    height: '100%',
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative'
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  }
})

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mobileOpen: false
    }
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  componentWillMount () {
    const { cookies } = this.props
    const token = cookies.get('token')
    this.setState({ token })
  }

  handleDrawerToggle () {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render () {
    const { dispatch, isAuthenticated, classes, theme } = this.props
    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List>{topListItems}</List>
        <Divider />
        <List>{otherListItems}</List>
        <Divider />
        <List>
          {
            isAuthenticated
              ? <Logout dispatch={dispatch} onLogoutClick={userActions.logout} />
              : <Login />
          }
        </List>
      </div>
    )

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header drawClick={this.handleDrawerToggle} />
          <Hidden mdUp>
            <Drawer
              type='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation='css'>
            <Drawer
              style={{height: '100%'}}
              type='permanent'
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Main />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  cookies: PropTypes.any.isRequired
}

const mapStateToProps = state => {
  console.log(state)
  const { auth } = state
  const { isAuthenticated } = auth

  return {
    isAuthenticated
  }
}

export default withStyles(styles, { withTheme: true })(withCookies(withRouter(connect(mapStateToProps)(App))))

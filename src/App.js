import './App.css'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import List from 'material-ui/List'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import Facebook from 'mdi-material-ui/Facebook'
import Twitter from 'mdi-material-ui/Twitter'
import Discord from 'mdi-material-ui/Discord'
import Twitch from 'mdi-material-ui/Twitch'
import CssBaseline from 'material-ui/CssBaseline'

// actions
import { userActions } from './_actions'

// components
import { topListItems, otherListItems, adminItem, loggedInItems } from './components/NavItems/NavItems'
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
    minHeight: '100%'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
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
    const { dispatch } = this.props
    dispatch(userActions.checkIfAuthenticated())
    dispatch(userActions.checkIfAdmin())
  }

  handleDrawerToggle () {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render () {
    const { dispatch, isAuthenticated, classes, theme, isAdmin } = this.props
    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <a href='https://www.facebook.com/FightLabBrighton/' target='_blank' rel='noopener noreferrer' className='no-decor'>
            <IconButton>
              <Facebook />
            </IconButton>
          </a>
          <a href='https://twitter.com/Fight_Lab/' target='_blank' rel='noopener noreferrer' className='no-decor'>
            <IconButton>
              <Twitter />
            </IconButton>
          </a>
          <a href='https://www.twitch.tv/fightlab' target='_blank' rel='noopener noreferrer' className='no-decor'>
            <IconButton>
              <Twitch />
            </IconButton>
          </a>
          <a href='https://discord.gg/9kZAXTT' target='_blank' rel='noopener noreferrer' className='no-decor'>
            <IconButton>
              <Discord />
            </IconButton>
          </a>
        </div>
        <Divider />
        <List>{topListItems}</List>
        <Divider />
        <List>{otherListItems}</List>
        <Divider />
        {
          isAdmin &&
          <List>{adminItem}</List>
        }
        <List>
          {
            isAuthenticated && loggedInItems
          }
          {
            isAuthenticated
              ? <Logout dispatch={dispatch} onLogoutClick={userActions.logout} />
              : <Login />
          }
        </List>
        <Divider />
        <div style={{justifyContent: 'flex-start'}} className={classes.drawerHeader}>
          <Typography variant='caption' component='p'>
            <br />
            Brighton FGC Site by
            <br />
            <a href='http://mkn.sh' target='_blank' rel='noopener noreferrer' className='no-decor'>
              Mahesh Makani (ColdLink)
            </a>
            <br />
            <br />
            <a href='https://github.com/coldlink/brighton-fgc-client' target='_blank' rel='noopener noreferrer' className='no-decor'>Client</a>: {process.env.REACT_APP_ENV_CLIENT_VERSION || 'dev'}
            <br />
            <a href='https://github.com/coldlink/brighton-fgc-api' target='_blank' rel='noopener noreferrer' className='no-decor'>API</a>: {process.env.REACT_APP_ENV_API_VERSION || 'dev'}
            <br />
            <br />
          </Typography>
        </div>
        <Divider />
      </div>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.appFrame}>
          <Header drawClick={this.handleDrawerToggle} />
          <Hidden mdUp>
            <Drawer
              variant='temporary'
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
          <Hidden smDown implementation='css'>
            <Drawer
              style={{height: '100%'}}
              variant='permanent'
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Main isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  const { isAuthenticated, isAdmin } = auth

  return {
    isAuthenticated,
    isAdmin
  }
}

export default withStyles(styles, { withTheme: true })(withCookies(withRouter(connect(mapStateToProps)(App))))

import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { withStyles } from '@material-ui/core/styles'
import DateRangeIcon from '@material-ui/icons/DateRange'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import PeopleIcon from '@material-ui/icons/People'
import StarsIcon from '@material-ui/icons/Stars'
import WcIcon from '@material-ui/icons/Wc'
// import ViewListIcon from '@material-ui/icons/ViewList'

import AdminGame from './Game'
import AdminTournament from './Tournament'
import AdminPlayer from './Player'
// import AdminSeries from './Series'
import AdminEvent from './Event'
import AdminCharacter from './Character'

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

class Admin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, value) {
    this.setState({ value })
  }

  render () {
    const { classes } = this.props
    const { value } = this.state

    return (
      <Paper className={classes.root} elevation={0}>
        <Typography variant='h3' component='h1'>
          Admin
        </Typography>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label='Events' icon={<DateRangeIcon />} />
          <BottomNavigationAction label='Games' icon={<VideogameAssetIcon />} />
          <BottomNavigationAction label='Players' icon={<PeopleIcon />} />
          {/* <BottomNavigationAction label='Series' icon={<ViewListIcon />} /> */}
          <BottomNavigationAction label='Tournaments' icon={<StarsIcon />} />
          <BottomNavigationAction label='Characters' icon={<WcIcon />} />
        </BottomNavigation>
        {
          value === 0 && (
            <div>
              <Typography variant='h5' component='h3'>
                Events
              </Typography>
              <AdminEvent />
            </div>
          )
        }
        {
          value === 1 && (
            <div>
              <Typography variant='h5' component='h3'>
                Games
              </Typography>
              <AdminGame />
            </div>
          )
        }
        {
          value === 2 && (
            <div>
              <Typography variant='h5' component='h3'>
                Players
              </Typography>
              <AdminPlayer />
            </div>
          )
        }
        {/* {
          value === 3 && (
            <div>
              <Typography variant='h5' component='h3'>
                Series
              </Typography>
              <AdminSeries />
            </div>
          )
        } */}
        {
          value === 3 && (
            <div>
              <Typography variant='h5' component='h3'>
                Tournaments
              </Typography>
              <AdminTournament />
            </div>
          )
        }
        {
          value === 4 && (
            <div>
              <Typography variant='h5' component='h3'>
                Characters
              </Typography>
              <AdminCharacter />
            </div>
          )
        }
      </Paper>
    )
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Admin)

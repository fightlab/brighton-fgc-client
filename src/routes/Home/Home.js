import React from 'react'
import { Typography, Paper, Hidden } from 'material-ui'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import './Home.css'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    height: '100%',
    background:
      `linear-gradient(
        rgba(0, 0, 0, 0.7), 
        rgba(0, 0, 0, 0.7)
      ),
      url("https://res.cloudinary.com/mkn-sh/image/upload/f_auto/v1514624353/fgc/hbk.jpg");`,
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  })
})

const Home = ({classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Hidden smUp>
      <Typography type='display2' component='h1'>
        Habrewken
      </Typography>
      <Typography type='headline' component='h2'>
        Brighton Fighting Game Community - Website and Resource
      </Typography>
    </Hidden>
    <Hidden smDown>
      <Typography type='display4' component='h1'>
        Habrewken
      </Typography>
      <Typography type='display1' component='h2'>
        Brighton Fighting Game Community - Website and Resource
      </Typography>
    </Hidden>
  </Paper>
)

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)

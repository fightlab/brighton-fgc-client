import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'

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

const About = ({classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Typography type='display2' component='h1'>
    About Us
    </Typography>
  </Paper>
)

About.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(About)

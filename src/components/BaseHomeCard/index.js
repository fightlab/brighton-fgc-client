import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    flexGrow: 1,
    padding: '0 !important'
  }
})

class BaseHomeCard extends React.Component {
  render () {
    const { classes, children, title } = this.props
    return (
      <AppBar position='static' color='default'>
        <Tabs
          value={0}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <Tab label={title} />
        </Tabs>
        <Card className={classes.card}>
          <CardContent
            className={classes.cardContent}
          >
            {children}
          </CardContent>
        </Card>
      </AppBar>
    )
  }
}

BaseHomeCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BaseHomeCard)

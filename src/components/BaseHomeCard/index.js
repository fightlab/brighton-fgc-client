import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    flexGrow: 1,
    padding: 8
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
          fullWidth
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

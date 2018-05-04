import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    flexGrow: 0,
    padding: 8
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
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={title}
        />
        <CardContent
          className={classes.cardContent}
        >
          {children}
        </CardContent>
      </Card>
    )
  }
}

BaseHomeCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BaseHomeCard)

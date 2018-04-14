import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  },
  cardContent: {
    padding: '0 !important',
    flexGrow: 1
  },
  embedContainer: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%'
  },
  embedContainerIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
})

class YoutubeCard extends React.Component {
  render () {
    const { classes, youtube } = this.props

    return (
      <Card className={classes.card}>
        <CardContent
          className={classes.cardContent}
        >
          <div className={classes.embedContainer}>
            <iframe className={classes.embedContainerIframe} src={youtube} frameBorder='0' allowFullScreen />
          </div>
        </CardContent>
      </Card>
    )
  }
}

YoutubeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  youtube: PropTypes.string.isRequired
}

export default withStyles(styles)(YoutubeCard)

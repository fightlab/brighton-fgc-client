import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import deepOrange from '@material-ui/core/colors/deepOrange'

const styles = theme => ({
  bgOrange: {
    backgroundColor: deepOrange[600]
  },
  chip: {
    margin: theme.spacing.unit,
    borderRadius: 16
  }
})

class PlayerChip extends React.Component {
  render () {
    const { playerId, classes, imageUrl, handle, orange = false } = this.props

    return (
      <ButtonBase
        component={Link}
        to={`/players/${playerId}`}
        className={classes.chip}
      >
        <Chip
          avatar={
            <Avatar src={imageUrl} />
          }
          label={handle}
          className={`${orange ? classes.bgOrange : ''}`}
        />
      </ButtonBase>
    )
  }
}

PlayerChip.propTypes = {
  playerId: PropTypes.string,
  classes: PropTypes.object,
  imageUrl: PropTypes.string,
  handle: PropTypes.string,
  orange: PropTypes.bool
}

export default withStyles(styles)(PlayerChip)

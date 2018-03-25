import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { seriesActions } from '../../../_actions'
import { DateService } from '../../../_services'

import GameCard from '../../../components/GameCard'
import StandingList from '../../../components/StandingsList'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  }
})

class Series extends React.Component {
  componentWillMount () {
    const { dispatch, match } = this.props

    dispatch(seriesActions.get(match.params.seriesId))
  }

  render () {
    const { classes, series = {}, match } = this.props
    const { name, updatedAt, _gameId: game } = series._series || {}

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography variant='display1' component='h2'>
            { name }
          </Typography>
          <Typography variant='caption' gutterBottom>
            Last Updated - {updatedAt && DateService.format(updatedAt)}
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <StandingList variant='series' id={match.params.seriesId} />
        </Grid>
        <Grid item sm={6} xs={12}>
          { game && <GameCard game={game} /> }
        </Grid>
      </Grid>
    )
  }
}

Series.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.any,
  series: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { series } = state
  return {
    series
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Series))

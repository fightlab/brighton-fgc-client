import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'

import { seriesActions } from '../../_actions'

import SeriesCard from '../../components/SeriesCard'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  media: {
    height: 200,
    backgroundSize: 'contain'
  }
})

class Root extends React.Component {
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(seriesActions.getAll())
  }

  render () {
    const { classes, series } = this.props
    const current = orderBy(filter(series.series, e => e.isCurrent))
    const past = orderBy(filter(series.series, e => !e.isCurrent))

    return (
      <div>
        {
          series.isFetching && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='display1' component='h2'>
                Current Series
              </Typography>
            </Grid>
            {
              <CircularProgress className={classes.progress} size={50} />
            }
          </Grid>
        }
        {
          !!current.length && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='display1' component='h2'>
               Current Series
              </Typography>
            </Grid>
            {
              current.map(series => (
                <SeriesCard series={series} key={series.id} />
              ))
            }
          </Grid>
        }
        {
          series.isFetching && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='display1' component='h2'>
                Past Series
              </Typography>
            </Grid>
            {
              <CircularProgress className={classes.progress} size={50} />
            }
          </Grid>
        }
        {
          !!past.length && <Grid spacing={16} container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant='display1' component='h2'>
                Past Series
              </Typography>
            </Grid>
            {
              past.map(series => (
                <SeriesCard series={series} key={series.id} />
              ))
            }
          </Grid>
        }
      </div>
    )
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  series: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { series } = state
  return {
    series
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Root)))

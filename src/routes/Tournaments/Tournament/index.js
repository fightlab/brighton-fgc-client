import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'

import { DateService } from '../../../_services'
import { tournamentActions } from '../../../_actions'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    width: '100%'
  }
})

class Tournament extends React.Component {
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(tournamentActions.get(match.params.tournamentId))
  }

  render () {
    const { classes, tournament } = this.props

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Typography type='display1' component='h2'>
            {tournament.tournament && tournament.tournament.name}
          </Typography>
          <Typography type='subheading' component='h4'>
            {tournament.tournament && DateService.format(tournament.tournament.dateStart)}
          </Typography>
          <a href={tournament.tournament && tournament.tournament.bracket} target='_blank' className='no-decor'>
            <Button dense>
              Challonge Page
            </Button>
          </a>
        </Grid>
      </Grid>
    )
  }
}

Tournament.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tournament: PropTypes.object.isRequired,
  match: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { tournament } = state
  return {
    tournament
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Tournament)))

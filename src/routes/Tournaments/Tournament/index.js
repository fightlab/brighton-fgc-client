import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'

import { DateService } from '../../../_services'
import { tournamentActions } from '../../../_actions'

import EventCard from '../../../components/EventCard'
import GameCard from '../../../components/GameCard'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    width: '100%',
    display: 'flex'
  },
  box: {
    display: 'flex'
  }
})

class Tournament extends React.Component {
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(tournamentActions.get(match.params.tournamentId))
  }

  render () {
    const { classes, tournament: tournamentObj } = this.props

    const { tournament } = tournamentObj
    const { event, _gameId: game, series, players } = tournament || {}
    console.log(series)
    console.log(players)
    return (
      <Grid
        container
        className={classes.container}
      >
        <Grid item xs={12}>
          <Typography type='display1' component='h2'>
            {tournament && tournament.name}
          </Typography>
          <Typography type='caption' gutterBottom>
            Last Updated - {tournament && DateService.format(tournament.updatedAt)}
          </Typography>
          <Typography type='subheading' component='h4'>
            <b>Event Date:</b>
            <br />
            {tournament && DateService.format(tournament.dateStart)} {
              tournament && tournament.dateEnd && <span> - {DateService.format(tournament.dateEnd)}</span>
            }
          </Typography>
          <br />
          <div className={classes.box}>
            <a style={{paddingRight: '4px'}} href={tournament && tournament.bracket} target='_blank' className='no-decor'>
              <Button dense raised color='primary'>
                Challonge Page
              </Button>
            </a>
            {
              tournament && DateService.compareDates(tournament.dateStart, new Date().toISOString()) && <a style={{paddingLeft: '4px'}} href={tournament && tournament.signUpUrl} target='_blank' className='no-decor'>
                <Button dense raised color='primary'>
                  Sign Up Page
                </Button>
              </a>
            }
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          { event && <EventCard event={event} /> }
        </Grid>
        <Grid item sm={6} xs={12}>
          { game && <GameCard game={game} /> }
        </Grid>
        {/* <Grid item sm={6} xs={12}>
          players
        </Grid> */}
        <Grid item xs={12}>
          <Card
            className={classes.card}
          >
            {
              tournament && <iframe src={`${tournament.bracket.replace('http://', 'https://')}/module?multiplier=1&match_width_multiplier=1&show_final_results=0&show_standings=0&theme=2&subdomain=`} style={{minHeight: '500px', width: '100%'}} frameBorder='0' scrolling='auto' />
            }
          </Card>
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
  const { tournament, game } = state
  return {
    tournament,
    game
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Tournament)))

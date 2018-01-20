import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card'
import { Typography } from 'material-ui'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

import { DateService, MetaService } from '../../_services'

const styles = theme => ({
  card: {
    width: '100%'
  }
})

class TournamentCard extends React.Component {
  render () {
    const { tournament, classes } = this.props
    return (
      <Grid item xs={12} sm={6} lg={4}>
        <Card className={classes.card}>
          <CardHeader
            title={tournament.name}
            subheader={DateService.format(tournament.dateStart, 'DATE_HUGE')}
          />
          <CardContent>
            <Typography component='p' align='center' type='caption'>
              Type:
            </Typography>
            <Typography component='p' align='center' gutterBottom>
              {MetaService.toTitleCase(tournament.type)}
            </Typography>
            <Typography component='p' align='center' type='caption'>
              Game:
            </Typography>
            <Typography component='p' align='center' gutterBottom>
              {tournament._gameId.name}
            </Typography>
            <Typography component='p' align='center' type='caption'>
              Participants:
            </Typography>
            <Typography component='p' align='center' gutterBottom>
              {tournament.players.length}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography component='p' align='center' type='caption'>
                  Start:
                </Typography>
                <Typography component='p' align='center' gutterBottom>
                  {DateService.format(tournament.dateStart, 'TIME_SIMPLE')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component='p' align='center' type='caption'>
                  End:
                </Typography>
                <Typography component='p' align='center' gutterBottom>
                  {tournament.dateEnd ? DateService.format(tournament.dateEnd, 'TIME_SIMPLE') : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button dense color='primary' component={Link} to={`/tournaments/${tournament.id}`}>
              View Tournament
            </Button>
            <a href={tournament.bracket} target='_blank' className='no-decor'>
              <Button dense color='primary'>
                View Challonge
              </Button>
            </a>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

TournamentCard.propTypes = {
  tournament: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TournamentCard)

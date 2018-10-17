import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'

import { DateService, MetaService } from '../../_services'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    flexGrow: 1
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    flexGrow: 1
  }
})

class TournamentCard extends React.Component {
  render () {
    const { tournament, classes } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={tournament.name}
          subheader={DateService.format(tournament.dateStart, 'DATE_HUGE')}
        />
        <CardContent
          className={classes.cardContent}
        >
          <Typography component='p' align='center' variant='caption'>
              Type:
          </Typography>
          <Typography component='p' align='center' gutterBottom>
            {MetaService.toTitleCase(tournament.type)}
          </Typography>
          <Typography component='p' align='center' variant='caption'>
              Game:
          </Typography>
          <Typography component='p' align='center' gutterBottom>
            {tournament._gameId.name}
          </Typography>
          <Typography component='p' align='center' variant='caption'>
              Participants:
          </Typography>
          <Typography component='p' align='center' gutterBottom>
            {tournament.players.length}
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography component='p' align='center' variant='caption'>
                  Start:
              </Typography>
              <Typography component='p' align='center' gutterBottom>
                {DateService.format(tournament.dateStart, 'TIME_SIMPLE')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component='p' align='center' variant='caption'>
                  End:
              </Typography>
              <Typography component='p' align='center' gutterBottom>
                {tournament.dateEnd ? DateService.format(tournament.dateEnd, 'TIME_SIMPLE') : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
          {
            tournament.youtube && <Typography component='p' variant='caption' align='center'>
              <VideoLibraryIcon />
            </Typography>
          }
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button dense='true' color='primary' component={Link} to={`/tournaments/${tournament.id}`}>
              View Tournament
          </Button>
          {/* <a href={tournament.bracket} target='_blank' className='no-decor'>
            <Button dense='true' color='primary'>
                View Challonge
            </Button>
          </a> */}
        </CardActions>
      </Card>
    )
  }
}

TournamentCard.propTypes = {
  tournament: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TournamentCard)

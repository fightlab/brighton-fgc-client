import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import deepOrange from '@material-ui/core/colors/deepOrange'
import Typography from '@material-ui/core/Typography'
import Scrollbar from 'react-scrollbars-custom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { tournamentActions } from '../../_actions'
import { MetaService } from '../../_services'
import PlayerChip from '../../components/PlayerChip'

const styles = theme => ({
  bgOrange: {
    backgroundColor: deepOrange[600]
  },
  orange: {
    color: deepOrange[400]
  },
  scroll: {
    minHeight: 450
  },
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
  },
  noDeco: {
    textDecoration: 'none'
  }
})

class MatchList extends React.Component {
  constructor (props) {
    super(props)

    this.getImage = MetaService.getImage
  }

  componentDidMount () {
    const { id = '', dispatch } = this.props

    dispatch(tournamentActions.getMatches(id))
  }

  render () {
    const { classes, tournament: { matches = [] } } = this.props

    return (
      <Scrollbar className={classes.scroll}>
        <Grid container spacing={8} style={{ margin: 0, width: '100%' }}>
          {
            !!matches.length && map(orderBy(matches, m => new Date(m.endDate).getTime()), match => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={match.id}>
                <Card className={classes.card} raised>
                  <CardContent className={classes.cardContent}>
                    <Typography variant='caption' gutterBottom align='center'>
                      {match.roundName || `${match.round < 0 ? 'Losers' : ''} Round ${Math.abs(match.round)}`}
                    </Typography>
                    <Typography variant='button' align='center'>
                      <PlayerChip
                        playerId={match._player1Id.id}
                        imageUrl={match._player1Id.imageUrl}
                        handle={match._player1Id.handle}
                        orange={match._winnerId.id === match._player1Id.id}
                      />
                    </Typography>
                    <Typography variant='caption' align='center'>
                      {`${match._player1EloAfter} ${match._player1EloAfter - match._player1EloBefore < 0 ? '-' : '+'}${Math.abs(match._player1EloAfter - match._player1EloBefore)}`}
                    </Typography>
                    <Typography variant='subtitle1' align='center' className={match._winnerId.id === match._player1Id.id ? classes.orange : ''}>
                      {match.score[0].p1}
                    </Typography>
                    <Typography variant='subtitle1' align='center' className={match._winnerId.id === match._player2Id.id ? classes.orange : ''}>
                      {match.score[0].p2}
                    </Typography>
                    <Typography variant='caption' align='center'>
                      {`${match._player2EloAfter} ${match._player2EloAfter - match._player2EloBefore < 0 ? '-' : '+'}${Math.abs(match._player2EloAfter - match._player2EloBefore)}`}
                    </Typography>
                    <Typography variant='button' align='center'>
                      <PlayerChip
                        playerId={match._player2Id.id}
                        imageUrl={match._player2Id.imageUrl}
                        handle={match._player2Id.handle}
                        orange={match._winnerId.id === match._player2Id.id}
                      />
                    </Typography>

                  </CardContent>
                  {
                    !!match.youtubeId && <CardActions>
                      <a className={classes.noDeco} href={`https://www.youtube.com/watch?v=${match.youtubeId}&t=${match.youtubeTimestamp}`} target='_blank' rel='noopener noreferrer'>
                        <Button variant='outlined' color='primary' size='small'>
                          View VOD
                        </Button>
                      </a>
                    </CardActions>
                  }
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Scrollbar>
    )
  }
}

MatchList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { tournament } = state

  return {
    tournament
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(MatchList)))

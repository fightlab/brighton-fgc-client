import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import deepOrange from '@material-ui/core/colors/deepOrange'
import Typography from '@material-ui/core/Typography'
import Scrollbar from 'react-scrollbars-custom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import ButtonBase from '@material-ui/core/ButtonBase'

import { tournamentActions } from '../../_actions'

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
  chip: {
    margin: theme.spacing.unit,
    borderRadius: 16
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
  }
})

class MatchList extends React.Component {
  getImage (player) {
    if (player.imageUrl) return player.imageUrl
    return `https://www.gravatar.com/avatar/${player.emailHash}?d=robohash`
  }

  componentWillMount () {
    const { id = '', dispatch } = this.props

    dispatch(tournamentActions.getMatches(id))
  }

  render () {
    const { classes, tournament: { matches = [] } } = this.props

    return (
      <Scrollbar className={classes.scroll}>
        <Grid container spacing={8} style={{margin: 0, width: '100%'}}>
          {
            !!matches.length && map(orderBy(matches, m => new Date(m.endDate).getTime()), match => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={match.id}>
                <Card className={classes.card} raised>
                  <CardContent className={classes.cardContent}>
                    <Typography variant='caption' gutterBottom align='center'>
                      {match.roundName || `${match.round < 0 ? 'Losers' : ''} Round ${Math.abs(match.round)}`}
                    </Typography>
                    <Typography variant='button' align='center'>
                      <ButtonBase
                        component={Link}
                        to={`/players/${match._player1Id.id}`}
                        className={classes.chip}
                      >
                        <Chip
                          avatar={
                            <Avatar src={match._player1Id.imageUrl} />
                          }
                          label={match._player1Id.handle}
                          className={`${match._winnerId.id === match._player1Id.id ? classes.bgOrange : ''}`}
                        />
                      </ButtonBase>
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
                      <ButtonBase
                        component={Link}
                        to={`/players/${match._player2Id.id}`}
                        className={classes.chip}
                      >
                        <Chip
                          avatar={
                            <Avatar src={match._player2Id.imageUrl} />
                          }
                          label={match._player2Id.handle}
                          className={`${match._winnerId.id === match._player2Id.id ? classes.bgOrange : ''}`}
                        />
                      </ButtonBase>
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size='small'>Learn More</Button>
                  </CardActions> */}
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

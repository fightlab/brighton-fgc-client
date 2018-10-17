import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'

import { playerActions, gameActions } from '../../../_actions'
import PlayerCard from '../../../components/PlayerCard'
import GameCard from '../../../components/GameCard'
import ChartBase from '../../../components/ChartBase'

const styles = theme => ({
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  item: {
    textAlign: 'center'
  },
  standingsCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  standingsCardHeader: {
    // flexGrow: 1
  },
  standingsCardContent: {
    flexGrow: 1,
    padding: '0 !important'
  }
})

class PlayerGame extends React.Component {
  componentWillMount () {
    const { dispatch, match } = this.props
    dispatch(playerActions.get(match.params.playerId))
    dispatch(gameActions.get(match.params.gameId))
    dispatch(playerActions.getGameResults(match.params.playerId, match.params.gameId))
    dispatch(playerActions.getGameMatches(match.params.playerId, match.params.gameId))
  }

  render () {
    const { player: _player, game: _game, classes } = this.props

    const { player, results, matches } = _player
    const { game } = _game

    let options
    if (results && game && player) {
      options = {
        colors: ['#ff5722'],
        chart: {
          type: 'area'
        },
        title: {
          text: 'Elo Ratings'
        },
        subtitle: {
          text: `${player.handle} - ${game.name}`
        },
        xAxis: {
          categories: results.map(r => r._tournamentId.name.replace(/[^\x00-\x7F]/g, '')),
          visible: false
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, '#ff5722'],
                [1, 'rgba(255,87,34,0)']
              ]
            },
            marker: {
              radius: 3
            },
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2
              }
            },
            threshold: null
          },
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: event => {
                  this.props.history.push(`/tournaments/${event.point.options.key}`)
                }
              }
            }
          }
        },
        series: [{
          name: `${player.handle} - ${game.name}`,
          data: results.map(r => ({
            y: r.eloAfter,
            key: r._tournamentId.id
          }))
        }]
      }
    }

    return (
      <Grid
        spacing={16}
        container
        className={classes.container}
      >
        <Grid item sm={6} xs={12} className={classes.item}>
          { !!player && <PlayerCard player={player} />}
        </Grid>
        <Grid item sm={6} xs={12} className={classes.item}>
          { !!game && <GameCard game={game} />}
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Card className={classes.standingsCard} elevation={10}>
            <CardContent
              className={classes.standingsCardContent}
            >
              { !!options && <ChartBase options={options} />}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Card className={classes.standingsCard} elevation={10}>
            <CardContent
              className={classes.standingsCardContent}
            >
              {
                JSON.stringify(matches)
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

PlayerGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  match: PropTypes.any,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
}

const mapStateToProps = state => {
  const { player, game } = state
  return {
    player,
    game
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PlayerGame)))

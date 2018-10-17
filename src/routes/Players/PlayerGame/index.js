import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import MUIDataTable from 'mui-datatables'

import { playerActions, gameActions } from '../../../_actions'
import { DateService } from '../../../_services'
import PlayerCard from '../../../components/PlayerCard'
import GameCard from '../../../components/GameCard'
import ChartBase from '../../../components/ChartBase'
import PlayerChip from '../../../components/PlayerChip'

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
  },
  button: {
    margin: theme.spacing.unit
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

    const columns = [{
      name: 'Tournament',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <Button size='small' className={classes.button} component={Link} to={`/players/${value.id}`}>
              {value.name}
            </Button>
          )
        }
      }
    }, {
      name: 'Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            DateService.toISODate(value)
          )
        }
      }
    }, {
      name: 'Opponent',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <PlayerChip
              playerId={value.id}
              imageUrl={value.imageUrl}
              handle={value.handle}
            />
          )
        }
      }
    }, {
      name: 'Round',
      options: {
        filter: false,
        sort: false
      }
    }, {
      name: 'Result',
      options: {
        filter: true,
        sort: false
      }
    }, {
      name: 'Score',
      options: {
        filter: false,
        sort: false
      }
    }, {
      name: 'Elo Change',
      options: {
        filter: false,
        sort: true
      }
    }, {
      name: 'Elo Rating',
      options: {
        filter: false,
        sort: true
      }
    }]

    let data
    if (player && game && matches) {
      data = matches.map(m => [
        m._tournamentId,
        m.endDate,
        player.id === m._player1Id.id ? m._player2Id : m._player1Id,
        m.roundName || `${m.round < 0 ? 'Losers' : ''} Round ${Math.abs(m.round)}`,
        player.id === m._winnerId ? 'W' : 'L',
        `${m.score[0].p1} - ${m.score[0].p2}`,
        player.id === m._player1Id.id ? m._player1EloAfter - m._player1EloBefore : m._player2EloAfter - m._player2EloBefore,
        player.id === m._player1Id.id ? m._player1EloAfter : m._player2EloAfter
      ])
    }

    const optionsTable = {
      responsive: 'scroll',
      rowsPerPage: 25,
      rowsPerPageOptions: [10, 25, 50, 100],
      selectableRows: false,
      search: false,
      print: false,
      download: false,
      filterType: 'dropdown',
      viewColumns: false,
      filter: false
    }

    return (
      <Grid
        spacing={16}
        container
        className={classes.container}
      >
        <Grid item sm={6} xs={12} className={classes.item}>
          { !!player && <PlayerCard player={player} hide />}
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
                !!data && <MUIDataTable
                  title={`Matches - ${player.handle} - ${game.name}`}
                  data={data}
                  columns={columns}
                  options={optionsTable}
                />
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

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import MUIDataTable from 'mui-datatables'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import IconButton from '@material-ui/core/IconButton'
import {
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { uniq, uniqBy, flattenDeep } from 'lodash'
import memoize from 'memoize-one'

import { playerActions, gameActions } from '../../../_actions'
import { DateService, MetaService } from '../../../_services'
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
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

class PlayerGame extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tournament: '',
      opponent: '',
      round: '',
      result: '',
      vod: null,
      character: '',
      data: []
    }

    this.getImage = MetaService.getImage

    this.handleFormChange = this.handleFormChange.bind(this)

    this.getFilterList = memoize(
      (matches = []) => ({
        tournaments: uniqBy(matches.map(match => ({ id: match.tournament.id, name: match.tournament.name, date: match.date })), tournament => tournament.id),
        opponents: uniqBy(matches.map(match => match.opponent), opponent => opponent.id),
        rounds: uniq(matches.map(match => match.round)),
        characters: uniqBy(flattenDeep(matches.map(match => match.characters)), character => character.id)
      })
    )

    this.getMatches = memoize(
      (matches = [], filters) => matches
        .filter(m => {
          if (this.state.tournament) return this.state.tournament === m.tournament.id
          return true
        })
        .filter(m => {
          if (filters.opponent) return filters.opponent === m.opponent.id
          return true
        })
        .filter(m => {
          if (filters.round) return filters.round === m.round
          return true
        })
        .filter(m => {
          if (filters.character) return !!m.characters.find(character => character.id === filters.character)
          return true
        })
        .filter(m => {
          if (filters.result) return filters.result === m.result
          return true
        })
        .filter(m => {
          if (filters.vod === true) return !!m.youtube
          if (filters.vod === false) return !m.youtube
          return true
        })
        .map(m => [
          m.tournament,
          m.date,
          m.opponent,
          m.round,
          m.result,
          m.score,
          m.eloChange,
          m.eloAfter,
          m.youtube,
          m.characters
        ])
    )

    this.columns = [{
      name: 'Tournament',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, meta) => {
          return (
            <Button value={`${DateService.toISODate(meta.rowData[1])} - ${value.name}`} size='small' className={props.classes.button} component={Link} to={`/tournaments/${value.id}`}>
              {value.name}
            </Button>
          )
        }
      }
    }, {
      name: 'Date',
      options: {
        filter: false,
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
        sort: false,
        customBodyRender: value => {
          return (
            <PlayerChip
              playerId={value.id}
              imageUrl={this.getImage(value)}
              handle={value.handle}
              value={value.handle}
            />
          )
        }
      }
    }, {
      name: 'Round',
      options: {
        filter: true,
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
    }, {
      name: 'VOD',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          if (value) {
            return (
              // eslint-disable-next-line
              <a href={value} value='Yes' target='_blank'>
                <IconButton color='primary'>
                  <VideoLibraryIcon />
                </IconButton>
              </a>
            )
          } else {
            return (
              <span value='No' />
            )
          }
        }
      }
    }, {
      name: 'Characters',
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          return (
            <ul>
              {
                value.map(v => <li key={v.id} value={v.short}>{ v.short }</li>)
              }
            </ul>
          )
        }
      }
    }]

    this.tableOptions = {
      responsive: 'scroll',
      rowsPerPage: 10,
      rowsPerPageOptions: [5, 10, 25, 50],
      selectableRows: false,
      search: false,
      print: false,
      download: false,
      filterType: 'dropdown',
      viewColumns: true,
      filter: false
    }
  }

  componentDidMount () {
    const { dispatch, match } = this.props
    dispatch(playerActions.get(match.params.playerId))
    dispatch(gameActions.get(match.params.gameId))
    dispatch(playerActions.getGameResults(match.params.playerId, match.params.gameId))
    dispatch(playerActions.getGameMatches(match.params.playerId, match.params.gameId))
  }

  handleFormChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  getMuiTheme () {
    return MetaService.tableDarkThemePadding()
  }

  render () {
    const { player: _player, game: _game, classes } = this.props
    const { columns, tableOptions } = this
    const filters = { ...this.state }
    delete filters.data

    const { player, results, matches = [] } = _player
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
          // eslint-disable-next-line
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

    const filterLists = this.getFilterList(matches)
    const data = this.getMatches(matches, filters)

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
                !!data && !!game && !!player && <div>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>Matches Filters</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <form className={classes.root} autoComplete='off'>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Tournament</InputLabel>
                          <Select
                            name='tournament'
                            value={this.state.tournament}
                            onChange={this.handleFormChange}
                          >
                            <MenuItem value='' />
                            { filterLists.tournaments.map(tournament => <MenuItem key={tournament.id} value={tournament.id}>{`${DateService.toISODate(tournament.date)} - ${tournament.name}`}</MenuItem>) }
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Opponent</InputLabel>
                          <Select
                            name='opponent'
                            value={this.state.opponent}
                            onChange={this.handleFormChange}
                          >
                            <MenuItem value='' />
                            { filterLists.opponents.map(opponent => <MenuItem key={opponent.id} value={opponent.id}>{opponent.handle}</MenuItem>) }
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Rounds</InputLabel>
                          <Select
                            name='round'
                            value={this.state.round}
                            onChange={this.handleFormChange}
                          >
                            <MenuItem value='' />
                            { filterLists.rounds.map(round => <MenuItem key={round} value={round}>{round}</MenuItem>) }
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Characters</InputLabel>
                          <Select
                            name='character'
                            value={this.state.character}
                            onChange={this.handleFormChange}
                          >
                            <MenuItem value='' />
                            { filterLists.characters.map(character => <MenuItem key={character.id} value={character.id}>{character.short}</MenuItem>) }
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel>Result</InputLabel>
                          <Select
                            name='result'
                            value={this.state.result}
                            onChange={this.handleFormChange}
                          >
                            <MenuItem value='' />
                            <MenuItem value='W'>W</MenuItem>
                            <MenuItem value='L'>L</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel>VOD</InputLabel>
                          <Select
                            name='vod'
                            value={this.state.vod}
                            onChange={this.handleFormChange}
                          >
                            <MenuItem value='' />
                            <MenuItem value>YES</MenuItem>
                            <MenuItem value={false}>NO</MenuItem>
                          </Select>
                        </FormControl>
                      </form>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                      title={`Matches - ${player.handle} - ${game.name}`}
                      data={data}
                      columns={columns}
                      options={tableOptions}
                    />
                  </MuiThemeProvider>
                </div>
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

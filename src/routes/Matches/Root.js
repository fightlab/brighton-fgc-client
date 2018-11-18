import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import memoize from 'memoize-one'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { uniq } from 'lodash'

import { matchActions } from '../../_actions'
import { MetaService, DateService } from '../../_services'
import PlayerChip from '../../components/PlayerChip'
import GameChip from '../../components/GameChip'

const styles = theme => ({
  root: theme.mixins.gutters({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      marginTop: 64
    }
  }),
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

class Matches extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tournament: '',
      player: '',
      winner: '',
      loser: '',
      round: '',
      character: '',
      game: ''
    }

    this.getImage = MetaService.getImage

    this.columns = [{
      name: 'Tournament',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, meta) => {
          return (
            <Button value={`${DateService.toISODate(meta.rowData[2])} - ${value.name}`} size='small' className={props.classes.button} component={Link} to={`/tournaments/${value.id}`}>
              {value.name}
            </Button>
          )
        }
      }
    },
    {
      name: 'Game',
      options: {
        filter: false,
        sort: true,
        customBodyRender: value => {
          return (
            <GameChip
              gameId={value.id}
              imageUrl={value.imageUrl}
              name={value.name}
              value={value.name}
            />
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
      name: 'Round',
      options: {
        filter: false,
        sort: false
      }
    }, {
      name: 'Player 1',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, meta) => {
          return (
            <PlayerChip
              playerId={value.id}
              imageUrl={this.getImage(value)}
              handle={value.handle}
              value={value.handle}
              orange={value.id === meta.rowData[6]}
            />
          )
        }
      }
    }, {
      name: 'Player 2',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, meta) => {
          return (
            <PlayerChip
              playerId={value.id}
              imageUrl={this.getImage(value)}
              handle={value.handle}
              value={value.handle}
              orange={value.id === meta.rowData[6]}
            />
          )
        }
      }
    }, {
      name: 'Winner',
      options: {
        filter: false,
        sort: false,
        display: 'excluded',
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
      name: 'Score',
      options: {
        filter: false,
        sort: false
      }
    }, {
      name: 'Characters',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value = []) => {
          return (
            <ul>
              {
                value.map(v => <li key={v.id} value={v.short}>{ v.short }</li>)
              }
            </ul>
          )
        }
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
    }]

    this.options = {
      responsive: 'scroll',
      rowsPerPage: 50,
      rowsPerPageOptions: [10, 25, 50, 100, 200],
      selectableRows: false,
      search: false,
      print: false,
      download: false,
      filterType: 'dropdown',
      viewColumns: true,
      filter: false
    }

    this.buildMap = memoize(
      ({ tournaments, games, characters, players }) => {
        const map = new Map()

        tournaments.forEach(tournament => map.set(tournament.id, tournament))
        games.forEach(game => map.set(game.id, game))
        characters.forEach(character => map.set(character.id, character))
        players.forEach(player => map.set(player.id, player))

        return map
      }
    )

    this.getMatches = memoize(
      (matches = [], filters, map) => matches
        .filter(m => {
          if (filters.tournament) return filters.tournament === m.tournament
          return true
        })
        .filter(m => {
          if (filters.player) {
            if (filters.player === m.player1) return true
            if (filters.player === m.player2) return true
            return false
          }
          return true
        })
        .filter(m => {
          if (filters.winner) return filters.winner === m.winner
          return true
        })
        .filter(m => {
          if (filters.loser) return filters.loser === m.loser
          return true
        })
        .filter(m => {
          if (filters.round) return filters.round === m.round
          return true
        })
        .filter(m => {
          if (filters.character) return !!m.characters.find(character => character === filters.character)
          return true
        })
        .filter(m => {
          if (filters.game) return filters.game === map.get(m.tournament)._gameId
          return true
        })
        .map(m => [
          map.get(m.tournament),
          map.get(map.get(m.tournament)._gameId),
          m.date,
          m.round,
          map.get(m.player1),
          map.get(m.player2),
          m.winner,
          m.score,
          m.characters.map(character => map.get(character)),
          m.youtube
        ])
    )

    this.getRounds = memoize(
      (matches = []) => uniq(matches.map(match => match.round))
    )

    this.handleFormChange = this.handleFormChange.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(matchActions.getMatchesYoutube())
  }

  handleFormChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  getMuiTheme () {
    return MetaService.tableDarkThemePadding()
  }

  render () {
    const { classes, match: { matches: _matches = {} } } = this.props
    const { columns, options } = this
    const filters = { ...this.state }

    const {
      matches = [],
      tournaments = [],
      games = [],
      characters = [],
      players = []
    } = _matches

    const rounds = this.getRounds(matches)
    const map = this.buildMap({ tournaments, games, characters, players })
    const data = this.getMatches(matches, filters, map)

    return (
      <Paper className={classes.root} elevation={0}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Matches Filters</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form className={classes.form} autoComplete='off'>
              <FormControl className={classes.formControl}>
                <InputLabel>Tournament</InputLabel>
                <Select
                  name='tournament'
                  value={this.state.tournament}
                  onChange={this.handleFormChange}
                >
                  <MenuItem value='' />
                  {
                    tournaments.map(
                      tournament => <MenuItem key={tournament.id} value={tournament.id}>
                        {`${DateService.toISODate(tournament.dateStart)} - ${tournament.name}`}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Player</InputLabel>
                <Select
                  name='player'
                  value={this.state.player}
                  onChange={this.handleFormChange}
                >
                  <MenuItem value='' />
                  {
                    players.map(
                      player => <MenuItem key={player.id} value={player.id}>
                        {player.handle}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Winner</InputLabel>
                <Select
                  name='winner'
                  value={this.state.winner}
                  onChange={this.handleFormChange}
                >
                  <MenuItem value='' />
                  {
                    players.map(
                      player => <MenuItem key={player.id} value={player.id}>
                        {player.handle}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Loser</InputLabel>
                <Select
                  name='loser'
                  value={this.state.loser}
                  onChange={this.handleFormChange}
                >
                  <MenuItem value='' />
                  {
                    players.map(
                      player => <MenuItem key={player.id} value={player.id}>
                        {player.handle}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Round</InputLabel>
                <Select
                  name='round'
                  value={this.state.round}
                  onChange={this.handleFormChange}
                >
                  <MenuItem value='' />
                  {
                    rounds.map(
                      round => <MenuItem key={round} value={round}>
                        {round}
                      </MenuItem>
                    )
                  }
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
                  { characters.map(character => <MenuItem key={character.id} value={character.id}>{`${character.short} - ${map.get(character.game).short}`}</MenuItem>) }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Game</InputLabel>
                <Select
                  name='game'
                  value={this.state.game}
                  onChange={this.handleFormChange}
                >
                  <MenuItem value='' />
                  {
                    games.map(
                      game => <MenuItem key={game.id} value={game.id}>
                        {game.name}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title=''
            data={data}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </Paper>
    )
  }
}

Matches.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { match } = state
  return {
    match
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Matches)))

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
import { uniq, find, flattenDeep } from 'lodash'

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
    this.filterTournaments = this.filterTournaments.bind(this)
    this.filterPlayers = this.filterPlayers.bind(this)
    this.filterWinners = this.filterWinners.bind(this)
    this.filterLosers = this.filterLosers.bind(this)
    this.filterCharacters = this.filterCharacters.bind(this)
    this.filterGames = this.filterGames.bind(this)
    this.filterRounds = this.filterRounds.bind(this)
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

  getMatchFilterByPlayer ({ player, matches }) {
    return matches.filter(m => {
      if (player === m.player1) return true
      if (player === m.player2) return true
      return false
    })
  }

  getMatchFilterWinner ({ winner, matches }) {
    return matches.filter(m => {
      if (winner === m.player1) return true
      if (winner === m.player2) return true
      return false
    })
  }

  getMatchFilterLoser ({ loser, matches }) {
    return matches.filter(m => {
      if (loser === m.player1) return true
      if (loser === m.player2) return true
      return false
    })
  }

  getMatchFilterTournament ({ tournament, matches }) {
    return matches.filter(m => tournament === m.tournament)
  }

  getMatchFilterRound ({ round, matches }) {
    return matches.filter(m => round === m.round)
  }

  getMatchFilterCharacter ({ character, matches }) {
    return matches.filter(m => !!m.characters.find(c => c === character))
  }

  getMatchFilterGame ({ game, matches, map }) {
    return matches.filter(m => game === map.get(m.tournament)._gameId)
  }

  filterTournaments ({ tournaments = [], matches = [], map }) {
    const { game, player, winner, loser, round, character } = this.state

    // filter tournaments by player/winner/loser/round/character
    // first get all matches with player
    if (player) {
      matches = this.getMatchFilterByPlayer({ player, matches })
    }

    // next check for winner
    if (winner) {
      matches = this.getMatchFilterWinner({ winner, matches })
    }

    // next check for loser
    if (loser) {
      matches = this.getMatchFilterLoser({ loser, matches })
    }

    // next check for round
    if (round) {
      matches = this.getMatchFilterRound({ round, matches })
    }

    // next check for characters
    if (character) {
      matches = this.getMatchFilterCharacter({ character, matches })
    }

    if (game) {
      matches = this.getMatchFilterGame({ game, matches, map })
    }

    // now map to tournaments
    if (player || winner || loser || round || character || game) {
      const _tournaments = []
      uniq(matches.map(m => m.tournament)).forEach(id => {
        const tournament = find(tournaments, t => t.id === id)
        if (tournament) _tournaments.push(tournament)
      })
      tournaments = _tournaments
    }

    // return updated (or not updated tournaments)
    return tournaments
  }

  filterPlayers ({ players = [], matches = [], map }) {
    const { game, winner, loser, round, character, tournament } = this.state

    // next check for winner
    if (winner) {
      matches = this.getMatchFilterWinner({ winner, matches })
    }

    // next check for loser
    if (loser) {
      matches = this.getMatchFilterLoser({ loser, matches })
    }

    // next check for round
    if (round) {
      matches = this.getMatchFilterRound({ round, matches })
    }

    // next check for characters
    if (character) {
      matches = this.getMatchFilterCharacter({ character, matches })
    }

    // and tournaments
    if (tournament) {
      matches = this.getMatchFilterTournament({ tournament, matches })
    }

    if (game) {
      matches = this.getMatchFilterGame({ game, matches, map })
    }

    // now map
    if (tournament || winner || loser || round || character || game) {
      const _players = []
      uniq([...matches.map(m => m.player1), ...matches.map(m => m.player2)]).forEach(id => {
        const player = find(players, p => p.id === id)
        if (player) _players.push(player)
      })
      players = _players
    }

    return players
  }

  filterWinners ({ players = [], matches = [], map }) {
    const { game, player, loser, round, character, tournament } = this.state

    // next check for player
    if (player) {
      matches = this.getMatchFilterPlayer({ player, matches })
    }

    // next check for loser
    if (loser) {
      matches = this.getMatchFilterLoser({ loser, matches })
    }

    // next check for round
    if (round) {
      matches = this.getMatchFilterRound({ round, matches })
    }

    // next check for characters
    if (character) {
      matches = this.getMatchFilterCharacter({ character, matches })
    }

    // and tournaments
    if (tournament) {
      matches = this.getMatchFilterTournament({ tournament, matches })
    }

    if (game) {
      matches = this.getMatchFilterGame({ game, matches, map })
    }

    // now map
    if (tournament || player || loser || round || character || game) {
      const _winners = []
      uniq(matches.map(m => m.winner)).forEach(id => {
        const winner = find(players, p => p.id === id)
        if (winner) _winners.push(winner)
      })
      players = _winners
    }

    return players
  }

  filterLosers ({ players = [], matches = [], map }) {
    const { game, player, winner, round, character, tournament } = this.state

    // next check for player
    if (player) {
      matches = this.getMatchFilterPlayer({ player, matches })
    }

    // next check for winner
    if (winner) {
      matches = this.getMatchFilterWinner({ winner, matches })
    }

    // next check for round
    if (round) {
      matches = this.getMatchFilterRound({ round, matches })
    }

    // next check for characters
    if (character) {
      matches = this.getMatchFilterCharacter({ character, matches })
    }

    // and tournaments
    if (tournament) {
      matches = this.getMatchFilterTournament({ tournament, matches })
    }

    if (game) {
      matches = this.getMatchFilterGame({ game, matches, map })
    }

    // now map
    if (tournament || player || winner || round || character || game) {
      const _losers = []
      uniq(matches.map(m => m.loser)).forEach(id => {
        const loser = find(players, p => p.id === id)
        if (loser) _losers.push(loser)
      })
      players = _losers
    }

    return players
  }

  filterGames ({ games = [], matches = [], map }) {
    const { player, winner, loser, round, character, tournament } = this.state

    // next check for winner
    if (winner) {
      matches = this.getMatchFilterWinner({ winner, matches })
    }

    // next check for loser
    if (loser) {
      matches = this.getMatchFilterLoser({ loser, matches })
    }

    // next check for round
    if (round) {
      matches = this.getMatchFilterRound({ round, matches })
    }

    // next check for characters
    if (character) {
      matches = this.getMatchFilterCharacter({ character, matches })
    }

    // and tournaments
    if (tournament) {
      matches = this.getMatchFilterTournament({ tournament, matches })
    }

    if (player) {
      matches = this.getMatchFilterByPlayer({ player, matches })
    }

    // now map
    if (tournament || winner || loser || round || character || player) {
      const _games = []
      uniq(matches.map(m => map.get(m.tournament)._gameId)).forEach(id => {
        const game = find(games, p => p.id === id)
        if (game) _games.push(game)
      })
      games = _games
    }

    return games
  }

  filterCharacters ({ characters = [], matches, map }) {
    const { player, winner, loser, round, game, tournament } = this.state

    // next check for winner
    if (winner) {
      matches = this.getMatchFilterWinner({ winner, matches })
    }

    // next check for loser
    if (loser) {
      matches = this.getMatchFilterLoser({ loser, matches })
    }

    // next check for round
    if (round) {
      matches = this.getMatchFilterRound({ round, matches })
    }

    // next check for games
    if (game) {
      matches = this.getMatchFilterGame({ game, matches, map })
    }

    // and tournaments
    if (tournament) {
      matches = this.getMatchFilterTournament({ tournament, matches })
    }

    if (player) {
      matches = this.getMatchFilterByPlayer({ player, matches })
    }

    // now map
    if (tournament || winner || loser || round || game || player) {
      const _characters = []
      uniq(flattenDeep(matches.map(m => m.characters || []))).forEach(id => {
        const character = find(characters, p => p.id === id)
        if (character) _characters.push(character)
      })
      characters = _characters
    }

    return characters
  }

  filterRounds ({ rounds = [], matches = [], map }) {
    const { player, winner, loser, character, game, tournament } = this.state

    // next check for winner
    if (winner) {
      matches = this.getMatchFilterWinner({ winner, matches })
    }

    // next check for loser
    if (loser) {
      matches = this.getMatchFilterLoser({ loser, matches })
    }

    // next check for character
    if (character) {
      matches = this.getMatchFilterCharacter({ character, matches })
    }

    // next check for games
    if (game) {
      matches = this.getMatchFilterGame({ game, matches, map })
    }

    // and tournaments
    if (tournament) {
      matches = this.getMatchFilterTournament({ tournament, matches })
    }

    if (player) {
      matches = this.getMatchFilterByPlayer({ player, matches })
    }

    // now map
    if (tournament || winner || loser || character || game || player) {
      const _rounds = []
      uniq(matches.map(m => m.round)).forEach(round => {
        const rFind = find(rounds, r => r === round)
        if (rFind) _rounds.push(round)
      })
      rounds = _rounds
    }

    return rounds
  }

  render () {
    const { classes, match: { matches: _matches = {} } } = this.props
    const { columns, options } = this
    const filters = { ...this.state }

    let {
      matches = [],
      tournaments = [],
      games = [],
      characters = [],
      players = []
    } = _matches

    const map = this.buildMap({ tournaments, games, characters, players })
    const data = this.getMatches(matches, filters, map)
    let rounds = this.getRounds(matches)

    // update filters
    tournaments = this.filterTournaments({ tournaments, matches, map })
    players = this.filterPlayers({ players, matches, map })
    games = this.filterGames({ games, matches, map })
    characters = this.filterCharacters({ characters, matches, map })
    rounds = this.filterRounds({ rounds, matches, map })
    const winners = this.filterWinners({ players, matches, map })
    const losers = this.filterLosers({ players, matches, map })

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
                    winners.map(
                      winner => <MenuItem key={winner.id} value={winner.id}>
                        {winner.handle}
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
                    losers.map(
                      loser => <MenuItem key={loser.id} value={loser.id}>
                        {loser.handle}
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

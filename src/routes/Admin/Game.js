import React from 'react'
import PropTypes from 'prop-types'
import Table, {
  TableBody,
  TableCell,
  // TableFooter,
  TableHead,
  // TablePagination,
  TableRow
  // TableSortLabel
} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SaveIcon from 'material-ui-icons/Save'
import AddCircleIcon from 'material-ui-icons/AddCircle'

import { GameService } from '../../_services'

class GameRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      game: props.game
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveGame = this.saveGame.bind(this)
  }

  handleChange (event) {
    const { game } = this.state
    game[event.target.name] = event.target.value
    this.setState({ game })
  }

  saveGame () {
    console.log(this.state.game)
  }

  render () {
    const { game } = this.state

    return (
      <TableRow>
        <TableCell>
          <TextField
            id='name'
            name='name'
            value={game.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='short'
            name='short'
            value={game.short || ''}
            onChange={this.handleChange}
            placeholder='Short'
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='imageUrl'
            name='imageUrl'
            value={game.imageUrl || ''}
            onChange={this.handleChange}
            placeholder='Image URL'
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={this.saveGame} aria-label='Save'>
            <SaveIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

class NewGameRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      game: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.addGame = this.addGame.bind(this)
  }

  handleChange (event) {
    const { game } = this.state
    game[event.target.name] = event.target.value
    this.setState({ game })
  }

  addGame () {
    console.log(this.state.game)
  }

  render () {
    const { game } = this.state

    return (
      <TableRow>
        <TableCell>
          <TextField
            id='name'
            name='name'
            value={game.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='short'
            name='short'
            value={game.short || ''}
            onChange={this.handleChange}
            placeholder='Short'
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='imageUrl'
            name='imageUrl'
            value={game.imageUrl || ''}
            onChange={this.handleChange}
            placeholder='Image URL'
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={this.addGame} aria-label='Save'>
            <AddCircleIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

class AdminGame extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      games: []
    }
  }

  componentWillMount () {
    GameService
      .getAll()
      .then(games => {
        this.setState({
          games
        })
      })
  }

  render () {
    const { games } = this.state
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Short</TableCell>
            <TableCell>Image URL</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            games && games.map(game => {
              return (
                <GameRow game={game} key={game.id} />
              )
            })
          }
          <NewGameRow />
        </TableBody>
      </Table>
    )
  }
}

GameRow.propTypes = {
  game: PropTypes.object.isRequired
}

export default AdminGame

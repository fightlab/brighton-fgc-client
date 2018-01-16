import React from 'react'
import PropTypes from 'prop-types'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SaveIcon from 'material-ui-icons/Save'
import AddCircleIcon from 'material-ui-icons/AddCircle'
import CloseIcon from 'material-ui-icons/Close'
import DeleteIcon from 'material-ui-icons/Delete'
import Snackbar from 'material-ui/Snackbar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { GameService } from '../../_services'

class GameRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      game: props.game
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveGame = this.saveGame.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
  }

  handleChange (event) {
    const { game } = this.state
    game[event.target.name] = event.target.value
    this.setState({ game })
  }

  saveGame () {
    const { token } = this.props
    const { game } = this.state

    GameService
      .update(token, game.id, game)
      .then(game => {
        this.setState({ game, saved: true })
      })
      .catch(error => this.setState({ error }))
  }

  closeSnackbar () {
    this.setState({
      saved: false
    })
  }

  render () {
    const { game } = this.state
    const { deleteGame } = this.props

    return (
      <TableRow>
        <TableCell style={{padding: '5px'}}>{game.id}</TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='name'
            name='name'
            value={game.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='short'
            name='short'
            value={game.short || ''}
            onChange={this.handleChange}
            placeholder='Short'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='imageUrl'
            name='imageUrl'
            value={game.imageUrl || ''}
            onChange={this.handleChange}
            placeholder='Image URL'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <IconButton onClick={this.saveGame} aria-label='Save'>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => deleteGame(game.id)} aria-label='Delete'>
            <DeleteIcon />
          </IconButton>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={this.state.saved}
            autoHideDuration={6000}
            onClose={this.closeSnackbar}
            SnackbarContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id='message-id'>Saved</span>}
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                onClick={this.closeSnackbar}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
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
  }

  handleChange (event) {
    const { game } = this.state
    game[event.target.name] = event.target.value
    this.setState({ game })
  }

  render () {
    const { game } = this.state
    const { addGame } = this.props

    return (
      <TableRow>
        <TableCell />
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='name'
            name='name'
            value={game.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='short'
            name='short'
            value={game.short || ''}
            onChange={this.handleChange}
            placeholder='Short'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='imageUrl'
            name='imageUrl'
            value={game.imageUrl || ''}
            onChange={this.handleChange}
            placeholder='Image URL'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <IconButton onClick={() => addGame(game)} aria-label='Save'>
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

    this.handleAddGame = this.handleAddGame.bind(this)
    this.handleDeleteGame = this.handleDeleteGame.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.performDeleteGame = this.performDeleteGame.bind(this)
    this.closeDeleted = this.closeDeleted.bind(this)
  }

  componentWillMount () {
    GameService
      .getAll()
      .then(games => this.setState({ games }))
      .catch(error => this.setState({ error }))
  }

  handleAddGame (body) {
    const { token } = this.props
    GameService
      .create(token, body)
      .then(game => {
        const { games } = this.state
        games.unshift(game)
        this.setState({ games, added: true })
      })
      .catch(error => this.setState({ error }))
  }

  handleDeleteGame (id) {
    this.setState({
      deleteStart: true,
      id
    })
  }

  performDeleteGame () {
    const { token } = this.props
    const { id } = this.state

    this.closeSnackbar()

    if (!id) {
      return
    }

    GameService
      .delete(token, id)
      .then(() => {
        let { games } = this.state
        games = games.filter(o => o.id !== id)
        this.setState({ games, deleted: true })
      })
      .catch(error => this.setState({ error }))
  }

  closeSnackbar () {
    this.setState({
      added: false,
      deleteStart: false
    })
  }

  closeDeleted () {
    this.setState({
      id: null,
      deleted: false
    })
  }

  render () {
    const { games } = this.state
    const { token } = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{padding: '5px'}}>ID</TableCell>
              <TableCell style={{padding: '5px'}}>Name</TableCell>
              <TableCell style={{padding: '5px'}}>Short</TableCell>
              <TableCell style={{padding: '5px'}}>Image URL</TableCell>
              <TableCell style={{padding: '5px'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <NewGameRow addGame={this.handleAddGame} />
            {
              games && games.map(game => (
                <GameRow game={game} key={game.id} token={token} deleteGame={this.handleDeleteGame} />
              ))
            }
          </TableBody>
        </Table>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.added}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Added</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.deleteStart}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Confirm Delete</span>}
          action={[
            <IconButton
              key='delete'
              aria-label='Delete'
              color='inherit'
              onClick={this.performDeleteGame}
            >
              <DeleteIcon />
            </IconButton>,
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.deleted}
          autoHideDuration={6000}
          onClose={this.closeDeleted}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Deleted</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.closeDeleted}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

AdminGame.propTypes = {
  token: PropTypes.string.isRequired
}

GameRow.propTypes = {
  game: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  deleteGame: PropTypes.func.isRequired
}

NewGameRow.propTypes = {
  addGame: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  const { user } = auth
  const token = get(user, 'token')

  return {
    token
  }
}

export default withRouter(connect(mapStateToProps)(AdminGame))

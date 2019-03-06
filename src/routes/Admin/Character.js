import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { orderBy, remove } from 'lodash'

import { CharacterService } from '../../_services'

class MergeRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      correct: '',
      wrong: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.merge = this.merge.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  merge () {
    const { token, removeCharacterHandler } = this.props
    const { correct, wrong } = this.state

    CharacterService
      .merge(token, correct, wrong)
      .then(() => {
        this.setState({ merged: true, wrong: '' })
        removeCharacterHandler(wrong)
      })
  }

  closeSnackbar () {
    this.setState({
      merged: false
    })
  }

  render () {
    const { correct, wrong } = this.state

    return (
      <TableRow>
        <TableCell style={{ padding: '5px' }}>Merge</TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='correct'
            name='correct'
            value={correct || ''}
            onChange={this.handleChange}
            placeholder='Correct ID'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          -
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='wrong'
            name='wrong'
            value={wrong || ''}
            onChange={this.handleChange}
            placeholder='Wrong ID'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <Button variant='contained' color='primary' onClick={this.merge}>
            Merge
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={this.state.merged}
            autoHideDuration={6000}
            onClose={this.closeSnackbar}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id='message-id'>Merged</span>}
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

class CharacterRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      character: props.character,
      saved: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.save = this.save.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
  }

  handleChange (event) {
    const { character } = this.state
    character[event.target.name] = event.target.value
    this.setState({ character })
  }

  save () {
    const { token } = this.props
    const { character } = this.state

    CharacterService
      .update(token, character.id, character)
      .then(character => {
        this.setState({ character, saved: true })
      })
      .catch(error => this.setState({ error }))
  }

  closeSnackbar () {
    this.setState({
      saved: false
    })
  }

  render () {
    const { character } = this.state

    return (
      <TableRow>
        <TableCell style={{ padding: '5px' }}>{character.id}</TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='name'
            name='name'
            value={character.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='short'
            name='short'
            value={character.short || ''}
            onChange={this.handleChange}
            placeholder='Short'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='game'
            name='game'
            value={character.game || ''}
            onChange={this.handleChange}
            placeholder='Game'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <IconButton onClick={this.save} aria-label='Save'>
            <SaveIcon />
          </IconButton>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={this.state.saved}
            autoHideDuration={6000}
            onClose={this.closeSnackbar}
            ContentProps={{
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

class AdminCharacter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      chracters: []
    }

    this.removeCharacter = this.removeCharacter.bind(this)
  }

  componentDidMount () {
    CharacterService
      .getAll()
      .then(characters => this.setState({ characters }))
      .catch(error => this.setState({ error }))
  }

  removeCharacter (character) {
    const { characters } = this.state
    this.setState({ chracters: remove(characters, c => c.id === character) })
  }

  render () {
    let { characters } = this.state
    const { token } = this.props

    characters = orderBy(characters, ['game', 'short'], ['asc', 'asc'])

    return (
      <div>
        <Table>
          <TableHead>
            <MergeRow token={token} removeCharacterHandler={this.removeCharacter} />
            <TableRow>
              <TableCell style={{ padding: '5px' }}>ID</TableCell>
              <TableCell style={{ padding: '5px' }}>Name</TableCell>
              <TableCell style={{ padding: '5px' }}>Short</TableCell>
              <TableCell style={{ padding: '5px' }}>Game</TableCell>
              <TableCell style={{ padding: '5px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              characters && characters.map(character => (
                <CharacterRow character={character} key={character.id} token={token} />
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

MergeRow.propTypes = {
  removeCharacterHandler: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
}

CharacterRow.propTypes = {
  character: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
}

AdminCharacter.propTypes = {
  token: PropTypes.string.isRequired
}

const mapStatesToProps = state => {
  const { auth } = state
  const { access_token: token } = auth

  return {
    token
  }
}

export default withRouter(connect(mapStatesToProps)(AdminCharacter))

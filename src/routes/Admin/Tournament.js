import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import orderBy from 'lodash/orderBy'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { TournamentService, DateService } from '../../_services'

class TournamentRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tournament: props.tournament
    }

    this.challongeUpdate = this.challongeUpdate.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveTournament = this.saveTournament.bind(this)
  }

  handleChange (event) {
    const { tournament } = this.state
    tournament[event.target.name] = event.target.value
    this.setState({ tournament })
  }

  challongeUpdate () {
    const { token } = this.props
    const { tournament } = this.state

    TournamentService
      .challongeUpdate(token, tournament.id, tournament)
      .then(tournament => this.setState({ tournament, saved: true }))
      .catch(error => this.setState({ error }))
  }

  saveTournament () {
    const { token } = this.props
    const { tournament } = this.state

    TournamentService
      .update(token, tournament.id, tournament)
      .then(tournament => this.setState({ tournament, saved: true }))
      .catch(error => this.setState({ error }))
  }

  closeSnackbar () {
    this.setState({
      saved: false
    })
  }

  render () {
    const { tournament } = this.state
    const { deleteTournament } = this.props

    return (
      <TableRow>
        <TableCell style={{ padding: '5px' }}>{tournament.id}</TableCell>
        <TableCell style={{ padding: '5px' }}>{tournament.name}</TableCell>
        <TableCell style={{ padding: '5px' }}>{tournament.type}</TableCell>
        <TableCell style={{ padding: '5px' }}>{DateService.format(tournament.dateStart)}</TableCell>
        <TableCell style={{ padding: '5px' }}>{DateService.format(tournament.dateEnd)}</TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='bracket'
            name='bracket'
            value={tournament.bracket || ''}
            placeholder='Bracket URL'
            fullWidth
            margin='normal'
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='signUpUrl'
            name='signUpUrl'
            placeholder='Sign Up URL'
            value={tournament.signUpUrl || ''}
            fullWidth
            margin='normal'
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='youtube'
            name='youtube'
            value={tournament.youtube || ''}
            placeholder='YouTube URL'
            fullWidth
            margin='normal'
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='event'
            name='event'
            placeholder='Event ID'
            value={tournament.event || ''}
            fullWidth
            margin='normal'
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='_gameId'
            name='_gameId'
            placeholder='Game ID'
            value={tournament._gameId || ''}
            fullWidth
            margin='normal'
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <Button variant='contained' color='primary' onClick={this.challongeUpdate}>
            Challonge Update
          </Button>
          <IconButton aria-label='Save' onClick={this.saveTournament}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => deleteTournament(tournament.id)} aria-label='Delete'>
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

class NewTournamentRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tournament: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const { tournament } = this.state
    tournament[event.target.name] = event.target.value
    this.setState({ tournament })
  }

  render () {
    const { tournament } = this.state
    const { addTournament } = this.props

    return (
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='bracket'
            name='bracket'
            onChange={this.handleChange}
            value={tournament.bracket || ''}
            placeholder='Bracket URL'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='signUpUrl'
            onChange={this.handleChange}
            name='signUpUrl'
            placeholder='Sign Up URL'
            value={tournament.signUpUrl || ''}
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='youtube'
            name='youtube'
            value={tournament.youtube || ''}
            placeholder='YouTube URL'
            fullWidth
            margin='normal'
            onChange={this.handleChange}
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='event'
            name='event'
            placeholder='Event ID'
            value={tournament.event || ''}
            onChange={this.handleChange}
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='_gameId'
            name='_gameId'
            onChange={this.handleChange}
            placeholder='Game ID'
            value={tournament._gameId || ''}
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <IconButton onClick={() => addTournament(tournament)} aria-label='Save'>
            <AddCircleIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

class AdminTournament extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tournaments: []
    }

    this.handleDeleteTournament = this.handleDeleteTournament.bind(this)
    this.handleAddTournament = this.handleAddTournament.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.closeDeleted = this.closeDeleted.bind(this)
    this.performDeleteTournament = this.performDeleteTournament.bind(this)
  }

  componentDidMount () {
    TournamentService
      .getAllNoGame()
      .then(tournaments => this.setState({ tournaments: orderBy(tournaments, 'dateStart', 'desc') }))
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

  handleAddTournament (body) {
    const { token } = this.props
    TournamentService
      .create(token, body)
      .then(tournament => {
        const { tournaments } = this.state
        tournaments.unshift(tournament)
        this.setState({ tournaments, added: true })
      })
      .catch(error => this.setState({ error }))
  }

  handleDeleteTournament (id) {
    this.setState({
      deleteStart: true,
      id
    })
  }

  performDeleteTournament () {
    const { token } = this.props
    const { id } = this.state

    this.closeSnackbar()

    if (!id) {
      return
    }

    TournamentService
      .delete(token, id)
      .then(() => {
        let { tournaments } = this.state
        tournaments = tournaments.filter(o => o.id !== id)
        this.setState({ tournaments, deleted: true })
      })
      .catch(error => this.setState({ error }))
  }

  render () {
    const { tournaments } = this.state
    const { token } = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: '5px' }}>ID</TableCell>
              <TableCell style={{ padding: '5px' }}>Name</TableCell>
              <TableCell style={{ padding: '5px' }}>Type</TableCell>
              <TableCell style={{ padding: '5px' }}>Start</TableCell>
              <TableCell style={{ padding: '5px' }}>End</TableCell>
              <TableCell style={{ padding: '5px' }}>Bracket</TableCell>
              <TableCell style={{ padding: '5px' }}>Sign Up</TableCell>
              <TableCell style={{ padding: '5px' }}>YouTube</TableCell>
              <TableCell style={{ padding: '5px' }}>Event</TableCell>
              <TableCell style={{ padding: '5px' }}>Game</TableCell>
              <TableCell style={{ padding: '5px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <NewTournamentRow addTournament={this.handleAddTournament} />
            {
              tournaments.map(tournament => (
                <TournamentRow tournament={tournament} key={tournament.id} deleteTournament={this.handleDeleteTournament} token={token} />
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
          ContentProps={{
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
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id='message-id'>Confirm Delete (This will also delete any results/matches in this tournament)</span>}
          action={[
            <IconButton
              key='delete'
              aria-label='Delete'
              color='inherit'
              onClick={this.performDeleteTournament}
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
          ContentProps={{
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
          ]} />
      </div>
    )
  }
}

AdminTournament.propTypes = {
  token: PropTypes.string.isRequired
}

TournamentRow.propTypes = {
  tournament: PropTypes.object.isRequired,
  deleteTournament: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
}

NewTournamentRow.propTypes = {
  addTournament: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  const { access_token: token } = auth

  return {
    token
  }
}

export default withRouter(connect(mapStateToProps)(AdminTournament))

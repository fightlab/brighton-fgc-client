import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get, orderBy } from 'lodash'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SaveIcon from 'material-ui-icons/Save'
import DeleteIcon from 'material-ui-icons/Delete'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from 'material-ui-icons/Close'

import { TournamentService, DateService } from '../../_services'

class TournamentRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tournament: props.tournament
    }
  }

  render () {
    const { tournament } = this.state
    const { deleteTournament } = this.props

    return (
      <TableRow>
        <TableCell>{tournament.id}</TableCell>
        <TableCell>{tournament.name}</TableCell>
        <TableCell>{tournament.type}</TableCell>
        <TableCell>{DateService.format(tournament.dateStart)}</TableCell>
        <TableCell>{DateService.format(tournament.dateEnd)}</TableCell>
        <TableCell>
          <TextField
            id='bracket'
            name='bracket'
            value={tournament.bracket || ''}
            placeholder='Bracket URL'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='signUpUrl'
            name='signUpUrl'
            placeholder='Sign Up URL'
            value={tournament.signUpUrl || ''}
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='series'
            name='series'
            placeholder='Series ID'
            value={tournament.series || ''}
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <TextField
            id='event'
            name='event'
            placeholder='Event ID'
            value={tournament.event || ''}
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell>
          <IconButton aria-label='Save'>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => deleteTournament(tournament.id)} aria-label='Delete'>
            <DeleteIcon />
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
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.closeDeleted = this.closeDeleted.bind(this)
    this.performDeleteTournament = this.performDeleteTournament.bind(this)
  }

  componentWillMount () {
    TournamentService
      .getAll()
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

    console.log(token)
    this.setState({ deleted: true })
  }

  render () {
    const { tournaments } = this.state
    console.log(tournaments[0])
    const { token } = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Bracket</TableCell>
              <TableCell>Sign Up</TableCell>
              <TableCell>Series</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
          open={this.state.deleteStart}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
          SnackbarContentProps={{
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
  deleteTournament: PropTypes.func.isRequired
  // token: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  const { user } = auth
  const token = get(user, 'token')

  return {
    token
  }
}

export default withRouter(connect(mapStateToProps)(AdminTournament))

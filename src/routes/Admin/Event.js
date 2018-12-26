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
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import orderBy from 'lodash/orderBy'
import { EventService } from '../../_services'

class EventRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      event: props.event
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveEvent = this.saveEvent.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
  }

  handleChange (e) {
    const { event } = this.state
    event[e.target.name] = e.target.value
    this.setState({ event })
  }

  saveEvent () {
    const { token } = this.props
    const { event } = this.state

    EventService
      .update(token, event.id, event)
      .then(event => {
        this.setState({ event, saved: true })
      })
      .catch(error => this.setState({ error }))
  }

  closeSnackbar () {
    this.setState({
      saved: false
    })
  }

  render () {
    const { event } = this.state
    const { deleteEvent } = this.props

    return (
      <TableRow>
        <TableCell style={{ padding: '5px' }}>{event.id}</TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='number'
            name='number'
            type='number'
            value={event.number || 1}
            onChange={this.handleChange}
            placeholder='Number'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='name'
            name='name'
            value={event.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='date'
            name='date'
            value={event.date || new Date().toISOString()}
            onChange={this.handleChange}
            placeholder='Date'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='venue'
            name='venue'
            value={event.venue || ''}
            onChange={this.handleChange}
            placeholder='Venue'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='url'
            name='url'
            value={event.url || ''}
            onChange={this.handleChange}
            placeholder='URL'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <IconButton onClick={this.saveEvent} aria-label='Save'>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => deleteEvent(event.id)} aria-label='Delete'>
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

class NewEventRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      event: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const { event } = this.state
    event[e.target.name] = e.target.value
    this.setState({ event })
  }

  render () {
    const { event } = this.state
    const { addEvent } = this.props

    event.venue = event.venue || 'Brewdog Brighton'

    return (
      <TableRow>
        <TableCell />
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='number'
            name='number'
            value={event.number || 1}
            type='number'
            onChange={this.handleChange}
            placeholder='Number'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='name'
            name='name'
            value={event.name || ''}
            onChange={this.handleChange}
            placeholder='Name'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='date'
            name='date'
            value={event.date || new Date().toISOString()}
            onChange={this.handleChange}
            placeholder='Date'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='venue'
            name='venue'
            value={event.venue || ''}
            onChange={this.handleChange}
            placeholder='Venue'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <TextField
            id='url'
            name='url'
            value={event.url || ''}
            onChange={this.handleChange}
            placeholder='URL'
            fullWidth
            margin='normal'
          />
        </TableCell>
        <TableCell style={{ padding: '5px' }}>
          <IconButton onClick={() => addEvent(event)} aria-label='Save'>
            <AddCircleIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

class AdminEvent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      events: []
    }

    this.handleAddEvent = this.handleAddEvent.bind(this)
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.performDeleteEvent = this.performDeleteEvent.bind(this)
    this.closeDeleted = this.closeDeleted.bind(this)
  }

  componentDidMount () {
    EventService
      .getAll()
      .then(events => this.setState({ events: orderBy(events, 'date', 'desc') }))
      .catch(error => this.setState({ error }))
  }

  handleAddEvent (body) {
    const { token } = this.props
    EventService
      .create(token, body)
      .then(event => {
        const { events } = this.state
        events.unshift(event)
        this.setState({ events, added: true })
      })
      .catch(error => this.setState({ error }))
  }

  handleDeleteEvent (id) {
    this.setState({
      deleteStart: true,
      id
    })
  }

  performDeleteEvent () {
    const { token } = this.props
    const { id } = this.state

    this.closeSnackbar()

    if (!id) {
      return
    }

    EventService
      .delete(token, id)
      .then(() => {
        let { events } = this.state
        events = events.filter(o => o.id !== id)
        this.setState({ events, deleted: true })
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
    const { events } = this.state
    const { token } = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: '5px' }}>ID</TableCell>
              <TableCell style={{ padding: '5px' }}>Number</TableCell>
              <TableCell style={{ padding: '5px' }}>Name</TableCell>
              <TableCell style={{ padding: '5px' }}>Date</TableCell>
              <TableCell style={{ padding: '5px' }}>Venue</TableCell>
              <TableCell style={{ padding: '5px' }}>URL</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <NewEventRow addEvent={this.handleAddEvent} />
            {
              events && events.map(event => (
                <EventRow event={event} key={event.id} token={token} deleteEvent={this.handleDeleteEvent} />
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
          message={<span id='message-id'>Confirm Delete</span>}
          action={[
            <IconButton
              key='delete'
              aria-label='Delete'
              color='inherit'
              onClick={this.performDeleteEvent}
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
          ]}
        />
      </div>
    )
  }
}

AdminEvent.propTypes = {
  token: PropTypes.string.isRequired
}

EventRow.propTypes = {
  event: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  deleteEvent: PropTypes.func.isRequired
}

NewEventRow.propTypes = {
  addEvent: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  const { access_token: token } = auth

  return {
    token
  }
}

export default withRouter(connect(mapStateToProps)(AdminEvent))

import React from 'react'
import PropTypes from 'prop-types'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from 'material-ui/Snackbar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get, set } from 'lodash'
import Chip from 'material-ui/Chip'
import { withStyles } from 'material-ui/styles'
import Switch from 'material-ui/Switch'

import { PlayerService } from '../../_services'

const styles = theme => ({
  box: {
    // display: 'flex',
    // justifyContent: 'center',
    // flexWrap: 'wrap'
  },
  chip: {
    // margin: 0
  }
})

class PlayerRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: props.player,
      show: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChallongeNameAdd = this.handleChallongeNameAdd.bind(this)
    this.handleChangechallongeNameInput = this.handleChangechallongeNameInput.bind(this)
    this.savePlayer = this.savePlayer.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
  }

  handleChange (event) {
    const { player } = this.state
    set(player, event.target.name, event.target.value)
    this.setState({ player })
  }

  handleChangechallongeNameInput (event) {
    this.setState({ challongeNameInput: event.target.value })
  }

  handleChallongeNameAdd (event) {
    if (event.key === 'Enter') {
      const { player } = this.state
      if (!player.challongeName) {
        player.challongeName = []
      }
      player.challongeName.push(event.target.value)
      this.setState({ player })
    }
  }

  handleSwitch (event, checked) {
    this.setState({ show: checked })
  }

  handleDeleteChallongeName (index) {
    const { player } = this.state
    player.challongeName.splice(index, 1)
    this.setState({ player })
  }

  savePlayer () {
    const { token } = this.props
    const { player } = this.state

    PlayerService
      .update(token, player.id, player)
      .then(player => this.setState({ player, saved: true }))
      .catch(error => this.setState({ error }))
  }

  closeSnackbar () {
    this.setState({
      saved: false
    })
  }

  render () {
    const { player, challongeNameInput, show } = this.state
    const { deletePlayer, classes } = this.props

    return (
      <TableRow>
        <TableCell style={{padding: '5px'}}>{player.id}</TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='handle'
            name='handle'
            value={player.handle || ''}
            onChange={this.handleChange}
            placeholder='Handle'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='challongeUsername'
            name='challongeUsername'
            value={player.challongeUsername || ''}
            onChange={this.handleChange}
            placeholder='Challonge Username'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell className={classes.box}>
          <Switch
            checked={show}
            onChange={this.handleSwitch}
            aria-label='switch'
          />
          {
            player.challongeName.map((name, i) => show && <Chip className={classes.chip} label={name} key={name} onDelete={() => this.handleDeleteChallongeName(i)} />)
          }
          {
            show && <TextField
              id='challongeNameInput'
              name='challongeNameInput'
              value={challongeNameInput || ''}
              onChange={this.handleChangechallongeNameInput}
              onKeyPress={this.handleChallongeNameAdd}
              placeholder='Challonge Names'
              margin='normal'
              fullWidth
            />
          }
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='emailHash'
            name='emailHash'
            value={player.emailHash || ''}
            onChange={this.handleChange}
            placeholder='Email Hash'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.facebook'
            name='profile.facebook'
            value={player.profile.facebook || ''}
            onChange={this.handleChange}
            placeholder='Facebook'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.twitter'
            name='profile.twitter'
            value={player.profile.twitter || ''}
            onChange={this.handleChange}
            placeholder='Twitter'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.instagram'
            name='profile.instagram'
            value={player.profile.instagram || ''}
            onChange={this.handleChange}
            placeholder='Instagram'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.web'
            name='profile.web'
            value={player.profile.web || ''}
            onChange={this.handleChange}
            placeholder='Website'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.playstation'
            name='profile.playstation'
            value={player.profile.playstation || ''}
            onChange={this.handleChange}
            placeholder='Playstation'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.xbox'
            name='profile.xbox'
            value={player.profile.xbox || ''}
            onChange={this.handleChange}
            placeholder='Xbox'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.steam'
            name='profile.steam'
            value={player.profile.steam || ''}
            onChange={this.handleChange}
            placeholder='Steam'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.discord'
            name='profile.discord'
            value={player.profile.discord || ''}
            onChange={this.handleChange}
            placeholder='Discord'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.twitch'
            name='profile.twitch'
            value={player.profile.twitch || ''}
            onChange={this.handleChange}
            placeholder='Twitch'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.github'
            name='profile.github'
            value={player.profile.github || ''}
            onChange={this.handleChange}
            placeholder='Github'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <IconButton onClick={this.savePlayer} aria-label='Save'>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => deletePlayer(player.id)} aria-label='Delete'>
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

class NewPlayerRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const { player } = this.state
    set(player, event.target.name, event.target.value)
    this.setState({ player })
  }

  render () {
    const { player } = this.state
    const { addPlayer } = this.props

    return (
      <TableRow>
        <TableCell />
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='handle'
            name='handle'
            value={player.handle || ''}
            onChange={this.handleChange}
            placeholder='Handle'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='challongeUsername'
            name='challongeUsername'
            value={player.challongeUsername || ''}
            onChange={this.handleChange}
            placeholder='Challonge Username'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='challongeName'
            name='challongeName'
            value={player.challongeName || ''}
            onChange={this.handleChange}
            placeholder='Challonge Names'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='emailHash'
            name='emailHash'
            value={player.emailHash || ''}
            onChange={this.handleChange}
            placeholder='Email Hash'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.facebook'
            name='profile.facebook'
            value={player.profile.facebook || ''}
            onChange={this.handleChange}
            placeholder='Facebook'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.twitter'
            name='profile.twitter'
            value={player.profile.twitter || ''}
            onChange={this.handleChange}
            placeholder='Twitter'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.instagram'
            name='profile.instagram'
            value={player.profile.instagram || ''}
            onChange={this.handleChange}
            placeholder='Instagram'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.web'
            name='profile.web'
            value={player.profile.web || ''}
            onChange={this.handleChange}
            placeholder='Website'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.playstation'
            name='profile.playstation'
            value={player.profile.playstation || ''}
            onChange={this.handleChange}
            placeholder='Playstation'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.xbox'
            name='profile.xbox'
            value={player.profile.xbox || ''}
            onChange={this.handleChange}
            placeholder='Xbox'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.steam'
            name='profile.steam'
            value={player.profile.steam || ''}
            onChange={this.handleChange}
            placeholder='Steam'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.discord'
            name='profile.discord'
            value={player.profile.discord || ''}
            onChange={this.handleChange}
            placeholder='Discord'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.twitch'
            name='profile.twitch'
            value={player.profile.twitch || ''}
            onChange={this.handleChange}
            placeholder='Twitch'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <TextField
            id='profile.github'
            name='profile.github'
            value={player.profile.github || ''}
            onChange={this.handleChange}
            placeholder='Github'
            margin='normal'
            fullWidth
          />
        </TableCell>
        <TableCell style={{padding: '5px'}}>
          <IconButton onClick={() => addPlayer(player)} aria-label='Save'>
            <AddCircleIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

class AdminPlayer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      players: []
    }

    this.handleAddPlayer = this.handleAddPlayer.bind(this)
    this.handleDeletePlayer = this.handleDeletePlayer.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.performDeletePlayer = this.performDeletePlayer.bind(this)
    this.closeDeleted = this.closeDeleted.bind(this)
  }

  componentWillMount () {
    PlayerService
      .all()
      .then(players => this.setState({ players }))
      .catch(error => this.setState({ error }))
  }

  handleAddPlayer (body) {
    const { token } = this.props
    PlayerService
      .create(token, body)
      .then(player => {
        const { players } = this.state
        players.push(player)
        this.setState({ players, added: true })
      })
      .catch(error => this.setState({ error }))
  }

  handleDeletePlayer (id) {
    this.setState({
      deleteStart: true,
      id
    })
  }

  performDeletePlayer () {
    const { token } = this.props
    const { id } = this.state

    this.closeSnackbar()

    if (!id) {
      return
    }

    PlayerService
      .delete(token, id)
      .then(() => {
        let { players } = this.state
        players = players.filter(o => o.id !== id)
        this.setState({ players, deleted: true })
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
    const { players } = this.state
    const { token, classes } = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{padding: '5px'}}>ID</TableCell>
              <TableCell style={{padding: '5px'}}>Handle</TableCell>
              <TableCell style={{padding: '5px'}}>Challonge Username</TableCell>
              <TableCell style={{padding: '5px'}}>Challonge Names</TableCell>
              <TableCell style={{padding: '5px'}}>Email Hash</TableCell>
              <TableCell style={{padding: '5px'}}>Facebook</TableCell>
              <TableCell style={{padding: '5px'}}>Twitter</TableCell>
              <TableCell style={{padding: '5px'}}>Instagram</TableCell>
              <TableCell style={{padding: '5px'}}>Website</TableCell>
              <TableCell style={{padding: '5px'}}>Playstation</TableCell>
              <TableCell style={{padding: '5px'}}>Xbox</TableCell>
              <TableCell style={{padding: '5px'}}>Steam</TableCell>
              <TableCell style={{padding: '5px'}}>Discord</TableCell>
              <TableCell style={{padding: '5px'}}>Twitch</TableCell>
              <TableCell style={{padding: '5px'}}>Github</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <NewPlayerRow addPlayer={this.handleAddPlayer} /> */}
            {
              players && players.map(player => (
                <PlayerRow classes={classes} player={player} key={player.id} token={token} deletePlayer={this.handleDeletePlayer} />
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
              onClick={this.performDeletePlayer}
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

AdminPlayer.propTypes = {
  token: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

PlayerRow.propTypes = {
  player: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

NewPlayerRow.propTypes = {
  addPlayer: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { auth } = state
  const { user } = auth
  const token = get(user, 'token')

  return {
    token
  }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(AdminPlayer)))

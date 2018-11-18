import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'

import { matchActions } from '../../_actions'
import { MetaService } from '../../_services/meta.service'

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
  }
})

class Matches extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filters: {},
      filterList: {}
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(matchActions.getMatchesYoutube())
  }

  getMuiTheme () {
    return MetaService.tableDarkThemePadding()
  }

  render () {
    const { classes, match: { matches: _matches = {} } } = this.props

    const {
      matches = [],
      tournaments = [],
      games = [],
      characters = [],
      players = []
    } = _matches

    const columns = [{
      name: 'Tournament'
    }, {
      name: 'Game'
    }, {
      name: 'Date'
    }, {
      name: 'Round'
    }, {
      name: 'Player 1'
    }, {
      name: 'Player 2'
    }, {
      name: 'Winner'
    }, {
      name: 'Score'
    }, {
      name: 'VOD'
    }, {
      name: 'Characters'
    }]

    const data = matches.map(m => [
      m.tournament,
      m.tournament,
      m.date,
      m.player1,
      m.player2,
      m.winner,
      m.score,
      m.youtube,
      JSON.stringify(m.characters)
    ])

    const optionsTable = {
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

    return (
      <Paper className={classes.root} elevation={0}>
        <Typography variant='h3' component='h1'>
          Matches
        </Typography>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={`Matches`}
            data={data}
            columns={columns}
            options={optionsTable}
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

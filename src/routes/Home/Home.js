import React from 'react'
import { Typography, Paper, Hidden, Grid, Button } from 'material-ui'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

import './Home.css'

const styles = theme => ({
  root: theme.mixins.gutters({
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    height: 'calc(100% - 56px)',
    background:
      `linear-gradient(
        rgba(0, 0, 0, 0.7), 
        rgba(0, 0, 0, 0.7)
      ),
      url("https://res.cloudinary.com/mkn-sh/image/upload/f_auto/v1514624353/fgc/hbk.jpg");`,
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    marginTop: 56,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }),
  container: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  media: {
    height: 75
  }
})

const Home = ({classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Hidden smUp>
      <Typography type='display2' component='h1'>
        Habrewken
      </Typography>
      <Typography type='headline' component='h2'>
        Brighton Fighting Game Community - Website and Resource
      </Typography>
    </Hidden>
    <Hidden smDown>
      <Typography type='display4' component='h1'>
        Habrewken
      </Typography>
      <Typography type='display1' component='h2'>
        Brighton Fighting Game Community - Website and Resource
      </Typography>
    </Hidden>
    <Grid container className={classes.container}>
      <Grid item sm={6} xs={12}>
        <Paper className={classes.paper} elevation={4}>
          <Typography type='title' component='h3'>
            Latest Events
          </Typography>
          <Typography type='subheading' component='h4'>
            Habrewken
          </Typography>
          <Grid container className={classes.container}>
            {
              [...Array(4)].map((v, i) => (
                <Grid item sm={6} xs={12} key={i}>
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image='https://res.cloudinary.com/mkn-sh/image/upload/c_lpad,w_300/v1480873684/fgc/games/bbcf.png'
                      title={`Event ${i + 1}`}
                    />
                    <CardContent>
                      <Typography type='headline' component='h2'>
                        {`Event ${i + 1}`}
                      </Typography>
                      <Typography component='p'>
                        This is some Event information
                      </Typography>
                      <CardActions>
                        <Button dense color='primary' component={Link} to={`/events/${i}`}>
                          View Event
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Paper className={classes.paper} elevation={4}>
          <Typography type='title' component='h3'>
            Current Standings
          </Typography>
          <Typography type='subheading' component='h4'>
            Street Fighter V - 2018 Series
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell numeric>Rank</TableCell>
                <TableCell>Player</TableCell>
                <TableCell numeric>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                [...Array(8)].map((v, i) => (
                  <TableRow key={i}>
                    <TableCell numeric>{i + 1}</TableCell>
                    <TableCell>
                      <Link className='no-decor' to={`/players/${i + 1}`}>Player {i + 1}</Link>
                    </TableCell>
                    <TableCell>10</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  </Paper>
)

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)

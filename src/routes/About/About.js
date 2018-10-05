import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

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

const About = ({classes}) => (
  <Paper className={classes.root} elevation={0}>
    <Typography variant='display2' component='h1'>
      About Us
    </Typography>
    <br />
    <Typography variant='display1' component='h2'>
      Who we are
    </Typography>
    <Typography variant='body2' component='p'>
      The Fight Lab Brighton are a group of players promoting the Brighton Fighting Game Community.
    </Typography>
    <Typography variant='body2' component='p'>
      We run events that promote the social nature of gaming, and focus on the competitive nature of fighting games.
    </Typography>
    <br />
    <Typography variant='display1' component='h2'>
      Events
    </Typography>
    <Typography variant='title' component='h3'>
      Habrewken
    </Typography>
    <Typography variant='body1' component='p'>
      Habrewken is our bimonthly event taking place every 2nd and 4th Wednesday of the month at Brewdog Brighton from 7PM.
    </Typography>
    <Typography variant='body1' component='p'>
      It is free to attend and to take part!
    </Typography>
    <Typography variant='body1' component='p'>
      We play a number of games with our main tournament games being Street Fighter V and Tekken 7, we usually have casual setups and/or side tournaments in other games.
    </Typography>
    <Typography variant='body1' component='p'>
      Information about the tournaments, events, games and players are available on this site, as well as via our Facebook, Twitter, and Discord, with links in the menu
    </Typography>
    <br />
    <Grid container className={classes.container}>
      <Grid item md={7} sm={12}>
        <iframe title='map' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.358867349505!2d-0.1376912838888517!3d50.82451637952868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875859f85f1209d%3A0x34e8561b881ac235!2sBrewDog+Brighton!5e0!3m2!1sen!2suk!4v1481479563024' width='100%' height='500' frameBorder='0' allowFullScreen='allowfullscreen' />
      </Grid>
      <Grid item md={5} sm={12}>
        <iframe title='discord' src='https://discordapp.com/widget?id=255761898379804682&theme=dark' width='350' height='500' allowTransparency='true' frameBorder='0' />
      </Grid>
    </Grid>
    <Typography variant='display1' component='h2'>
      Elo Rating
    </Typography>
    <Typography variant='body1' component='p'>
      We use the <a style={{ color: 'white' }} href='https://en.wikipedia.org/wiki/Elo_rating_system'>Elo Rating</a> system to calculate player's skill level at our events in each game, inspired by the system used at <a style={{ color: 'white' }} href='https://hbk.challonge.com/docs/challonge_ratings'>Challonge</a>.
    </Typography>
    <Typography variant='body1' component='p'>
      A new player starts with 1000 and will go up and down with wins and losses. If you're expected to win and you do, you and your opponents ratings won't change much. If you're expected to win but you don't, your rating will drop considerably and your opponent's will rise considerably. If your rating is similar to your opponent's, any outcome will moderately affect both players.
    </Typography>
    <Typography variant='body1' component='p'>
      We use the following K-Factor values:
      <br />
      Default K-Factor: 30
      <br />
      Elo > 1400: 20
      <br />
      Less than 30 Matches: 60
    </Typography>
  </Paper>
)

About.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(About)

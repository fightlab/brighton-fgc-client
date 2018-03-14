import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import { Typography } from 'material-ui'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    flexGrow: 1,
    height: 200,
    backgroundSize: 'contain'
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    flexGrow: 1
  }
})

class SeriesCard extends React.Component {
  render () {
    const { series, classes } = this.props
    return (
      <Grid item xs={12} sm={6} lg={4}>
        <Card className={classes.card} elevation={10}>
          <CardMedia
            className={classes.media}
            image={series._gameId.imageUrl}
            title={series.name}
          />
          <CardContent
            className={classes.cardContent}
          >
            <Typography type='headline' component='h2'>
              {series.name}
            </Typography>
          </CardContent>
          <CardActions
            className={classes.cardActions}
          >
            <Button dense='true' color='primary' component={Link} to={`/standings/${series.id}`}>
            View Standings
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

SeriesCard.propTypes = {
  series: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SeriesCard)

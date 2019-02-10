import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date)
      date ? this.setState(date) : this.stop()
    }, 1000)
  }

  componentWillUnmount() {
    this.stop()
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000

    // clear countdown when date is reached
    if (diff <= 0) return false

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400))
      diff -= timeLeft.years * 365.25 * 86400
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400)
      diff -= timeLeft.days * 86400
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600)
      diff -= timeLeft.hours * 3600
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60)
      diff -= timeLeft.min * 60
    }
    timeLeft.sec = diff

    return timeLeft
  }

  stop() {
    clearInterval(this.interval)
  }

  addLeadingZeros(value) {
    value = String(value)
    while (value.length < 2) {
      value = `0${value}`
    }
    return value
  }

  render() {
    const countDown = this.state
    return (
      <div style={{ maxWidth: '800px', margin: 'auto', marginBottom: '40px' }}>
        <Paper style={{ padding: '8px' }}>
          <Grid container justify="space-around" spacing={16} direction="row">
            <Grid
              item
              spacing={8}
              container
              direction="column"
              justify="center"
              alignContent="center"
              xs
            >
              <Grid item>
                <Typography variant="h2" align="center">
                  {this.addLeadingZeros(countDown.days)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" align="center">
                  {countDown.days === 1 ? 'Dia' : 'Dies'}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              spacing={8}
              container
              direction="column"
              justify="center"
              alignContent="center"
              xs
            >
              <Grid item>
                <Typography variant="h2" align="center">
                  {this.addLeadingZeros(countDown.hours)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" align="center">
                  {countDown.hours === 1 ? 'Hora' : 'Hores'}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              spacing={8}
              container
              direction="column"
              justify="center"
              alignContent="center"
              xs
            >
              <Grid item>
                <Typography variant="h2" align="center">
                  {this.addLeadingZeros(countDown.min)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" align="center">
                  {countDown.min === 1 ? 'Minut' : 'Minuts'}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              spacing={8}
              container
              direction="column"
              justify="center"
              alignContent="center"
              xs
            >
              <Grid item>
                <Typography variant="h2" align="center">
                  {this.addLeadingZeros(countDown.sec)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" align="center">
                  Segons
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired,
}

Countdown.defaultProps = {
  date: new Date(),
}

export default Countdown

import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import { getUserInfo } from '../../utils/auth'
import AdminOptions from './adminOptions'
import Countdown from '../countdown'
import NextVictim from './nextVictim'

class MyGame extends Component {
  constructor(props) {
    super(props)
    this.state = { authenticated: false, userEmail: '' }
  }

  componentDidMount() {
    if (navigator.onLine) {
      getUserInfo().then(res => this.setState({ userEmail: res.email }))
    }
  }

  render() {
    const { userEmail } = this.state
    return (
      <>
        <Typography variant="h5" paragraph>
          Temps de joc restant
        </Typography>
        <Countdown date="2019-03-06T20:00:00" />
        <Typography variant="h5" paragraph>
          La teva víctima
        </Typography>
        <NextVictim />
        {userEmail === process.env.GATSBY_ADMIN_EMAIL && <AdminOptions />}
      </>
    )
  }
}

export default MyGame

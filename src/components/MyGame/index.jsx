import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import { getUserInfo } from '../../utils/auth'
import AdminOptions from './adminOptions'
import Countdown from '../countdown'
import NextVictim from './nextVictim'
import MyVictims from './myVictims'
import InstallBanner from '../installBanner'
import YouAreKilledBanner from './youAreKilledBanner'

class MyGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      userEmail: '',
      isInstalled: false,
    }
  }

  componentDidMount() {
    if (navigator.onLine) {
      getUserInfo().then(res => this.setState({ userEmail: res.email }))
    }
    //this.setState({ isInstalled: localStorage.getItem('AppInstalled') })
  }

  hiddeInstallBanner = () => {
    localStorage.setItem('AppInstalled', true)
    this.setState({ isInstalled: true })
  }

  render() {
    const { userEmail, isInstalled } = this.state
    return (
      <>
        {!isInstalled && <InstallBanner />}
        <YouAreKilledBanner />
        <Typography variant="h5" paragraph>
          El joc comença en
        </Typography>
        <Countdown date="2019-02-27T22:00:00" />
        <Typography variant="h5" paragraph>
          Temps de joc restant
        </Typography>
        <Countdown date="2019-03-06T20:00:00" />
        <NextVictim />
        <MyVictims />

        {userEmail === process.env.GATSBY_ADMIN_EMAIL && <AdminOptions />}
      </>
    )
  }
}

export default MyGame

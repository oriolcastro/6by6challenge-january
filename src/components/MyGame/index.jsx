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
        //TODO: Afegir component per mostrar que el teu assesí t'ha matat i
        espera la validació.
        <div style={{ marginBottom: '36px' }}>
          <Typography variant="h4">Estas mort/a!</Typography>
          <Typography variant="body2" paragraph>
            NOM ha aconseguit iminar-te del joc. Confirma la mort i entrega-li
            el clauer.
          </Typography>
          <Button variant="contained" color="primary">
            Confirmar
          </Button>
        </div>
        <NextVictim />
        <MyVictims />
        {userEmail === process.env.GATSBY_ADMIN_EMAIL && <AdminOptions />}
      </>
    )
  }
}

export default MyGame

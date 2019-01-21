import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

class MyGame extends Component {
  constructor(props) {
    super(props)
    this.state = { authenticated: false, userEmail: '' }
  }

  render() {
    return (
      <>
        <Typography variant="h5">Benvingut/da de nou</Typography>
      </>
    )
  }
}

export default MyGame

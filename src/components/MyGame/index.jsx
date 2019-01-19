import React, { Component } from 'react'
import { isAuthenticated } from '../../utils/auth'

import { LoginComponent } from './login'

export class MyGame extends Component {
  constructor(props) {
    super(props)
    this.state = { authenticated: false }
  }

  componentDidMount() {
    this.setState({ authenticated: isAuthenticated() })
  }

  render() {
    const { authenticated } = this.state
    return (
      <>
        {authenticated && <p>You are loggedin</p>}

        {!authenticated && <LoginComponent />}
      </>
    )
  }
}

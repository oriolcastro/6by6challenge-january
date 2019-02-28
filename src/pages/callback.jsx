import React, { Component } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import { handleAuthentication } from '../utils/auth'
import withRoot from '../withRoot'

class Callback extends Component {
  componentDidMount() {
    handleAuthentication()
    setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        window.location.replace('http://localhost:8000/elmeujoc')
      } else {
        window.location.replace('https://www.lapastanagadelrei.cat')
      }
    }, 2000)
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'white',
        }}
      >
        <CircularProgress color="primary" />
      </div>
    )
  }
}

export default withRoot(Callback)

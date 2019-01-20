import React, { Component } from 'react'
import { navigate } from 'gatsby'
import CircularProgress from '@material-ui/core/CircularProgress'
import { handleAuthentication } from '../utils/auth'
import withRoot from '../withRoot'

class Callback extends Component {
  componentDidMount() {
    handleAuthentication()
    setTimeout(() => {
      navigate('/elmeujoc')
    }, 1000)
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

export default Callback

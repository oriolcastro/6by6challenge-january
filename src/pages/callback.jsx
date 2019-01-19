import React, { Component } from 'react'
import { navigate } from 'gatsby'
import CircularProgress from '@material-ui/core/CircularProgress'
import { handleAuthentication } from '../utils/auth'

class Callback extends Component {
  componentDidMount() {
    handleAuthentication()
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          height: '98vh',
          width: '98vw',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
        }}
      >
        <CircularProgress />
      </div>
    )
  }
}

export default Callback

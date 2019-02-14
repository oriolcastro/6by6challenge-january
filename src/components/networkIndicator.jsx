import React, { Component } from 'react'
import Offline from '@material-ui/icons/WifiOff'
import Snackbar from '@material-ui/core/Snackbar'

const isBrowser = typeof navigator !== 'undefined'

class NetworkIndicator extends Component {
  constructor() {
    super()
    this.state = {
      online:
        isBrowser && typeof navigator.onLine === 'boolean'
          ? navigator.onLine
          : true,
      showSnackbar: false,
    }
  }

  componentDidMount() {
    window.addEventListener('online', this.goOnline)
    window.addEventListener('offline', this.goOffline)
  }
  omponentWillUnmount() {
    window.removeEventListener('online', this.goOnline)
    window.removeEventListener('offline', this.goOffline)
  }

  goOnline = () => {
    if (!this.state.online) {
      this.callOnChangeHandler(true)
      this.setState({ online: true })
    }
  }

  goOffline = () => {
    if (this.state.online) {
      this.callOnChangeHandler(false)
      this.setState({ online: false, showSnackbar: true })
    }
  }

  callOnChangeHandler = online => {
    if (this.props.onChange) {
      console.log('callOnChangeHandler if statment')
      this.props.onChange(online)
    }
  }

  handleClose = () => {
    this.setState({ showSnackbar: false })
  }

  render() {
    const { online, showSnackbar } = this.state
    return (
      <div style={{ margin: '12px' }}>
        {!online && (
          <>
            <Offline />
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={showSnackbar}
              autoHideDuration={5000}
              message={
                <span id="message-id">
                  Has perdut la connexió. Algunes funcionalitats no estaran
                  disponibles.
                </span>
              }
              onClose={this.handleClose}
            />
          </>
        )}
      </div>
    )
  }
}

export default NetworkIndicator

import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

class SignupNotification extends Component {
  state = {
    open: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: true })
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={8000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">
            Inscripció efectuada correctament. Rebràs un coreu electrònic de
            confirmació a la direcció que has introduït.
          </span>
        }
      />
    )
  }
}

export default SignupNotification

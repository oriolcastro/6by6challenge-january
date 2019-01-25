import React, { Component } from 'react'
import InstallIcon from '@material-ui/icons/AddToHomeScreen'
import Button from '@material-ui/core/Button'

let deferredPrompt

class InstallIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = { showInstallButton: false }
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      console.log(e.platforms)
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      this.toogleInstallButton()
    })
  }
  handleClick = () => {
    // hide our user interface that shows our A2HS button
    this.toogleInstallButton() // Show the prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      deferredPrompt = null
    })
  }

  toogleInstallButton = () => {
    this.setState(prevState => ({
      showInstallButton: !prevState.showInstallButton,
    }))
  }

  render() {
    const { showInstallButton } = this.state
    return (
      <div id="btnInstall">
        {showInstallButton && (
          <Button onClick={this.handleClick}>
            Instal·la
            <InstallIcon />
          </Button>
        )}
      </div>
    )
  }
}

export default InstallIndicator

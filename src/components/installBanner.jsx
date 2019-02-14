import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

let deferredPrompt
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
})
class InstallBanner extends Component {
  constructor(props) {
    super(props)
    this.state = { showInstallBanner: false }
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      console.log(e.platforms)
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      this.toogleInstallBanner()
    })
  }
  handleInstall = () => {
    // hide our user interface that shows our A2HS button
    this.toogleInstallBanner()
    // Show the prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
        gtag('event', 'A2HS', {
          event_category: 'interacció',
          event_label: 'Install accepted',
        })
      } else {
        console.log('User dismissed the A2HS prompt')
        gtag('event', 'A2HS', {
          event_category: 'interacció',
          event_label: 'Install dismissed',
        })
      }
      deferredPrompt = null
    })
  }

  handleCancel = () => {
    this.toogleInstallBanner()
  }

  toogleInstallBanner = () => {
    this.setState(prevState => ({
      showInstallBanner: !prevState.showInstallBanner,
    }))
  }

  render() {
    const { showInstallBanner } = this.state
    const { classes } = this.props
    return (
      <>
        {showInstallBanner && (
          <Paper id="btnInstall" className={classes.root} elevation={4}>
            <Typography variant="h6" paragraph>
              Vols instal·lar l'aplicació?
            </Typography>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={this.handleCancel}>Cancel·la</Button>
              <Button color="primary" onClick={this.handleInstall}>
                Instal·la
              </Button>
            </div>
          </Paper>
        )}
      </>
    )
  }
}

export default withStyles(styles)(InstallBanner)

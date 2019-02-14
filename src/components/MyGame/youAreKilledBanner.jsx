import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Mutation } from 'react-apollo'

import { withFirebase } from '../../utils/firebase'
import ConfirmDialog from './confirmDialog'
import { VALIDATE_MY_DEATH } from '../../utils/queries'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
})

class YouAreKilledBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDead: false,
      killerName: '',
      isDialogOpen: false,
      killId: null,
    }
  }

  componentDidMount() {
    this.setState({
      killerName: localStorage.getItem('killerName'),
      isDead: localStorage.getItem('isDead'),
      killId: localStorage.getItem('killId'),
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.firebase !== prevProps.firebase) {
      const messaging = this.props.firebase.messaging()
      messaging.onMessage(payload => {
        console.log('onMessage: ', payload)
        const { haveBeenKilled, killerName, killId } = payload.data
        if (haveBeenKilled) {
          console.log('You are killed, show banner.')
          this.setState({
            isDead: true,
            killerName: killerName,
            killId: killId,
          })
          localStorage.setItem('isDead', true)
          localStorage.setItem('killerName', killerName)
          localStorage.setItem('killId', killId)
        }
      })
    }
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true })
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false })
  }

  resetBanner = () => {
    console.log('Reset information after mutation completed')
    localStorage.removeItem('killerName')
    localStorage.removeItem('killId')
    this.setState({
      isDead: false,
      killerName: '',
      isDialogOpen: false,
      killId: null,
    })
  }

  render() {
    const { classes } = this.props
    const { isDead, killerName, isDialogOpen, killId } = this.state

    return (
      <>
        {isDead && (
          <Paper className={classes.root}>
            <Typography variant="h4" gutterBottom>
              Estas mort/a!
            </Typography>
            <Typography variant="body2" paragraph>
              {killerName} ha aconseguit eliminar-te del joc. Confirma la mort i
              entrega-li el clauer.
            </Typography>
            <Mutation
              mutation={VALIDATE_MY_DEATH}
              variables={{ kill_id: killId }}
              onCompleted={this.resetBanner}
            >
              {update_killsDev => (
                <>
                  <Button color="primary" onClick={this.openDialog}>
                    Confirmar
                  </Button>
                  <ConfirmDialog
                    open={isDialogOpen}
                    closeDialog={this.closeDialog}
                    acceptDialog={() => {
                      update_killsDev()
                      this.closeDialog()
                    }}
                    title="Estàs mort/a?"
                    message="Si el teu assassí/na ha aconseguit eliminar-te, és moment d'acceptar-ho i entregar-li el clauer."
                  />
                </>
              )}
            </Mutation>
          </Paper>
        )}
      </>
    )
  }
}

export default withFirebase(withStyles(styles)(YouAreKilledBanner))

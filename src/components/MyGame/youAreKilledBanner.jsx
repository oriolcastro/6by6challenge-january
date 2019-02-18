import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Mutation, Query } from 'react-apollo'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress'
import { navigate } from 'gatsby'

import { withFirebase } from '../../utils/firebase'
import ConfirmDialog from './confirmDialog'
import { VALIDATE_MY_DEATH, GET_MY_STATUS } from '../../utils/queries'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
  modalPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
    width: '50vw',
    height: '50vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class YouAreKilledBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      haveBeenKilled: false,
      killerName: '',
      isDialogOpen: false,
      killId: null,
      loading: false,
    }
  }

  // componentDidMount() {
  //   const haveBeenKilled = localStorage.getItem('haveBeenKilled')
  //   if (haveBeenKilled !== null) {
  //     this.setState({
  //       killerName: localStorage.getItem('killerName'),
  //       haveBeenKilled: localStorage.getItem('haveBeenKilled'),
  //       killId: localStorage.getItem('killId'),
  //     })
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (this.props.firebase !== prevProps.firebase) {
      const messaging = this.props.firebase.messaging()
      messaging.onMessage(payload => {
        const { data } = payload
        console.log(data)
        //this.handlePayloadData(data)
      })
    }
  }

  // handlePayloadData = data => {
  //   console.log('You are killed, show banner.')
  //   const { haveBeenKilled, killerName, killId } = data
  //   this.setState({
  //     haveBeenKilled: haveBeenKilled,
  //     killerName: killerName,
  //     killId: killId,
  //   })
  //   localStorage.setItem('haveBeenKilled', haveBeenKilled)
  //   localStorage.setItem('killerName', killerName)
  //   localStorage.setItem('killId', killId)
  // }

  openDialog = () => {
    this.setState({ isDialogOpen: true })
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false })
  }

  resetBanner = () => {
    this.setState({
      haveBeenKilled: false,
      killerName: '',
      isDialogOpen: false,
      killId: null,
      loading: true,
    })
    console.log('Reset information after mutation completed')
    // localStorage.removeItem('haveBeenKilled')
    // localStorage.removeItem('killerName')
    // localStorage.removeItem('killId')
    setTimeout(() => {
      this.setState({ loading: false })
      //navigate('/elmeujoc', { replace: true })
      location.reload()
    }, 3000)
  }

  render() {
    const { classes } = this.props
    const { isDialogOpen, loading } = this.state
    let player_id
    if (typeof window !== 'undefined') {
      player_id = localStorage.getItem('player_id')
    }
    return (
      <>
        <Query
          query={GET_MY_STATUS}
          variables={{ player_id }}
          context={{ headers: { 'X-Hasura-Role': 'public' } }}
          pollInterval={10000}
          partialRefetch
        >
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error: ${error}`
            if (data.killsDev.length === 0) return null
            console.log(data)
            return (
              <>
                {data.killsDev[0].hasAssasinValidated && (
                  <Paper className={classes.root}>
                    <Typography variant="h4" gutterBottom>
                      Estas mort/a!
                    </Typography>
                    <Typography variant="body2" paragraph>
                      En/na {data.killsDev[0].assasin.name} ha aconseguit
                      eliminar-te del joc. Confirma la mort i entrega-li el
                      clauer.
                    </Typography>
                    <Mutation
                      mutation={VALIDATE_MY_DEATH}
                      variables={{ kill_id: data.killsDev[0].killId }}
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
          }}
        </Query>
        <Modal
          open={loading}
          disableAutoFocus
          disableBackdropClick
          disableEscapeKeyDown
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper className={classes.modalPaper}>
            <CircularProgress size={80} color="primary" />
          </Paper>
        </Modal>
      </>
    )
  }
}

export default withFirebase(withStyles(styles)(YouAreKilledBanner))

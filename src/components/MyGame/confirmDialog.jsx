import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmDialog = props => (
  <Dialog
    open={props.open}
    onClose={props.closeDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Validar mort?</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        La teva víctima també haurà de validar a través de l'aplicació que ha
        estat eliminada. Un cop validat per les dues parts t'apareixerà la
        informació de la següent víctima.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.closeDialog}>Cancela</Button>
      <Button onClick={props.acceptDialog}>Accepta</Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmDialog

import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

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
    this.state = { showBanner: true }
  }

  validateMyKill = () => {
    console.log('I validet my elimination from the game')
    this.setState({ showBanner: false })
  }

  render() {
    const { classes } = this.props
    const { showBanner } = this.state
    return (
      // TODO: Afegir component per mostrar que el teu assesí t'ha matat i espera la validació.
      <>
        {showBanner && (
          <Paper className={classes.root}>
            <Typography variant="h4">Estas mort/a!</Typography>
            <Typography variant="body2" paragraph>
              NOM ha aconseguit iminar-te del joc. Confirma la mort i entrega-li
              el clauer.
            </Typography>
            <Button color="primary" onClick={this.validateMyKill}>
              Confirmar
            </Button>
          </Paper>
        )}
      </>
    )
  }
}

export default withStyles(styles)(YouAreKilledBanner)

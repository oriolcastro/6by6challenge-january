import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Query, Mutation } from 'react-apollo'

import { GET_MY_CURRENT_VICTIM, VALIDATE_MY_KILL } from '../../utils/queries'
import Notification from '../notification'
import ConfirmDialog from './confirmDialog'

class NextVictim extends Component {
  state = {
    isDialogOpen: false,
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true })
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false })
  }

  render() {
    let player_id
    if (typeof window !== 'undefined') {
      player_id = localStorage.getItem('player_id')
    }
    const { isDialogOpen } = this.state
    return (
      <div style={{ marginBottom: '36px' }}>
        <Typography variant="h5" paragraph>
          La teva víctima
        </Typography>

        <Query
          query={GET_MY_CURRENT_VICTIM}
          variables={{ player_id }}
          context={{ headers: { 'X-Hasura-Role': 'public' } }}
          pollInterval={10000}
          partialRefetch
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return null
            if (error) return `Error: ${error}`
            if (data.killsDev.length === 0)
              return (
                <Typography variant="body2">
                  Has estat eliminat del joc
                </Typography>
              )
            console.log(data)
            return (
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {data.killsDev[0].victim.name}{' '}
                    {data.killsDev[0].victim.firstSurname}{' '}
                    {data.killsDev[0].victim.secondSurname}
                  </Typography>
                  <Typography variant="subtitle1">
                    {data.killsDev[0].victim.team.name}
                  </Typography>
                </CardContent>
                <CardActions style={{ textAlign: 'right' }}>
                  <Mutation
                    mutation={VALIDATE_MY_KILL}
                    variables={{ kill_id: data.killsDev[0].kill_id }}
                    onCompleted={() => {
                      refetch()
                    }}
                  >
                    {(update_killsDev, { called }) => (
                      <>
                        {!data.killsDev[0].hasAssasinValidated ? (
                          <>
                            <Button onClick={this.openDialog} color="primary">
                              Validar mort
                            </Button>
                            <ConfirmDialog
                              open={isDialogOpen}
                              closeDialog={this.closeDialog}
                              acceptDialog={() => {
                                update_killsDev()
                                this.closeDialog()
                              }}
                              title="Validar mort?"
                              message="La teva víctima també haurà de validar a través de l'aplicació que ha estat eliminada. Un cop validat per les dues parts t'apareixerà la
                              informació de la següent víctima."
                            />
                          </>
                        ) : (
                          <Button disabled>Pendent validació víctima</Button>
                        )}
                        <Notification
                          open={called}
                          message={`Mort validada correctament. Quan en/na ${
                            data.killsDev[0].victim.name
                          } també la validi rebràs la informació de la teva pròxima víctima.`}
                        />
                      </>
                    )}
                  </Mutation>
                </CardActions>
              </Card>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default NextVictim

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
          partialRefetch
        >
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error: ${error}`
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
                <CardActions>
                  <Mutation mutation={VALIDATE_MY_KILL}>
                    {(update_killsDev, { called }) => (
                      <>
                        {!data.killsDev[0].hasAssasinValidated ? (
                          <>
                            <Button onClick={this.openDialog}>
                              Validar mort
                            </Button>
                            <ConfirmDialog
                              open={isDialogOpen}
                              closeDialog={this.closeDialog}
                              acceptDialog={() => {
                                update_killsDev()
                                this.closeDialog()
                              }}
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
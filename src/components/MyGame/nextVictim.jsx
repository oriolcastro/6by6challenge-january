import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Query, Mutation } from 'react-apollo'

import {
  GET_VICTIM_ID,
  GET_VICTIM_DATA,
  VALIDATE_MY_KILL,
} from '../../utils/queries'

const NextVictim = () => {
  return (
    <Query query={GET_VICTIM_ID} partialRefetch>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error: ${error}`
        return (
          <Query
            query={GET_VICTIM_DATA}
            variables={{ VictimId: data.killsDev[0].victim_id }}
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
                      {data.playersDev[0].name}{' '}
                      {data.playersDev[0].firstSurname}{' '}
                      {data.playersDev[0].secondSurname}
                    </Typography>
                    <Typography variant="subtitle1">
                      {data.playersDev[0].team.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Mutation mutation={VALIDATE_MY_KILL}>
                      {/* TODO: Add visual clue that the validation is in process like a Snackbar and also change visual the data of my victim "pendent validació victima" */}
                      {update_killsDev => (
                        <Button
                          onClick={() => {
                            update_killsDev()
                          }}
                        >
                          Valida
                        </Button>
                      )}
                    </Mutation>
                  </CardActions>
                </Card>
              )
            }}
          </Query>
        )
      }}
    </Query>
  )
}

export default NextVictim

import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Query, Mutation } from 'react-apollo'

import { GET_VICTIM_ID, GET_VICTIM_DATA } from '../../utils/queries'

const NextVictim = () => {
  return (
    <Query query={GET_VICTIM_ID}>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error: ${error}`
        const [{ victim_id }] = data.killsDev
        console.log(victim_id)
        return <VictimCard VictimId={victim_id} />
      }}
    </Query>
  )
}

const VictimCard = props => {
  const { VictimId } = props
  return (
    <Query
      query={GET_VICTIM_DATA}
      variables={{ VictimId }}
      context={{ headers: { 'X-Hasura-Role': 'public' } }}
    >
      {({ data }) => {
        const [{ name, firstSurname, secondSurname }] = data.playersDev
        const [
          {
            team: { name: teamName },
          },
        ] = data.playersDev

        return (
          <Card>
            <CardContent>
              <Typography variant="h6">
                {name} {firstSurname} {secondSurname}
              </Typography>
              <Typography variant="subtitle1">{teamName}</Typography>
            </CardContent>
            <CardActions>
              <Button>Valida</Button>
            </CardActions>
          </Card>
        )
      }}
    </Query>
  )
}

export default NextVictim

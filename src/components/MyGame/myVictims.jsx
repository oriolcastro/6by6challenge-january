import React from 'react'
import { Query } from 'react-apollo'
import Typography from '@material-ui/core/Typography'
import localforage from 'localforage'
import VictimsList from '../victimsList'
import { GET_MY_KILLED_VICTIMS } from '../../utils/queries'

const MyVictims = () => {
  let player_id
  if (typeof window !== 'undefined') {
    localforage.getItem('player_id').then(value => {
      player_id = value
    })
    // player_id = localStorage.getItem('player_id')
  }
  return (
    <div>
      <Typography variant="h5" paragraph>
        Llista de morts
      </Typography>
      <Query
        query={GET_MY_KILLED_VICTIMS}
        variables={{ player_id }}
        pollInterval={10000}
        context={{ headers: { 'X-Hasura-Role': 'public' } }}
        partialRefetch
      >
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error: ${error}`
          return (
            <>
              {!data.kills.length == 0 ? (
                <VictimsList victims={data.kills} />
              ) : (
                <Typography variant="body2">
                  Encara no has aconseguit cap víctima
                </Typography>
              )}
            </>
          )
        }}
      </Query>
    </div>
  )
}

export default MyVictims

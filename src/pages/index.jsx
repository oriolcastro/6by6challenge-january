import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Query } from 'react-apollo'
import Grid from '@material-ui/core/Grid'
import withRoot from '../withRoot'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Countdown from '../components/countdown'
import VictimsList from '../components/victimsList'
import VictimsCardContainer from '../components/victimsCardContainer'
import {
  GET_LAST_VICTIMS,
  GET_LAST_AGGREGATE_VICTIMS_TODAY,
  GET_LAST_AGGREGATE_VICTIMS_TOTAL,
} from '../utils/queries'

const IndexPage = () => (
  <Layout>
    <SEO
      title="Resultats"
      description="Consulta els resultats en viu del joc."
      keywords={['pwa', 'carnaval', 'vilanova']}
    />
    <Typography variant="h5" paragraph>
      El joc comença en
    </Typography>
    <Countdown date="2019-02-27T22:00:00" />
    <Typography variant="h5" paragraph>
      Temps de joc restant
    </Typography>
    <Countdown date="2019-03-06T20:00:00" />
    <VictimsCardContainer />
    <Typography variant="h5" paragraph>
      Últimes víctimes
    </Typography>
    <Query
      query={GET_LAST_VICTIMS}
      pollInterval={30000}
      context={{
        headers: {
          'X-Hasura-Role': 'public',
          'X-Hasura-Access-Key': process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY,
        },
      }}
      partialRefetch
    >
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error: ${error}`
        return (
          <>
            {!data.kills.length == 0 ? (
              <VictimsList victims={data.killsDev} />
            ) : (
              <Typography variant="body2">
                Encara no hi ha cap víctima
              </Typography>
            )}
          </>
        )
      }}
    </Query>
  </Layout>
)

export default withRoot(IndexPage)

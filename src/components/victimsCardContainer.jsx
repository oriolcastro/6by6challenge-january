import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Grid from '@material-ui/core/Grid'
import dayjs from 'dayjs'

import VictimsCard from './victimsCard'
import {
  GET_LAST_AGGREGATE_VICTIMS_TODAY,
  GET_LAST_AGGREGATE_VICTIMS_TOTAL,
} from '../utils/queries'

class VictimsCardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { end: '', start: '' }
  }

  componentDidMount() {
    const today = dayjs()
    const startToday = today.startOf('day').format('YYYY-MM-DDTHH:mm:ss')
    const endToday = today.endOf('day').format('YYYY-MM-DDTHH:mm:ss')
    this.setState({ start: startToday, end: endToday })
  }

  render() {
    const { start, end } = this.state
    return (
      <div style={{ maxWidth: '800px', margin: 'auto', marginBottom: '40px' }}>
        <Grid container justify="space-between" spacing={16} direction="row">
          <Grid
            item
            spacing={8}
            container
            direction="column"
            justify="center"
            xs
          >
            <Query
              query={GET_LAST_AGGREGATE_VICTIMS_TODAY}
              variables={{ startToday: start, endToday: end }}
              context={{
                headers: {
                  'X-Hasura-Role': 'public',
                  'X-Hasura-Access-Key':
                    process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY,
                },
              }}
              partialRefetch
            >
              {({ loading, error, data }) => {
                if (loading) return null
                if (error) return `Error: ${error}`
                return <VictimsCard Title="Víctimes avui" {...data} />
              }}
            </Query>
          </Grid>
          <Grid
            item
            spacing={8}
            container
            direction="column"
            justify="center"
            xs
          >
            <Query
              query={GET_LAST_AGGREGATE_VICTIMS_TOTAL}
              context={{
                headers: {
                  'X-Hasura-Role': 'public',
                  'X-Hasura-Access-Key':
                    process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY,
                },
              }}
              partialRefetch
            >
              {({ loading, error, data }) => {
                if (loading) return null
                if (error) return `Error: ${error}`
                return <VictimsCard Title="Víctimes totals" {...data} />
              }}
            </Query>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default VictimsCardContainer

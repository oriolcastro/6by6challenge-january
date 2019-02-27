import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

const isBrowser = typeof window !== 'undefined'
let token = ''
if (isBrowser) {
  token = localStorage.getItem('id_token')
}

export const client = new ApolloClient({
  uri: process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT,
  fetch,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
})

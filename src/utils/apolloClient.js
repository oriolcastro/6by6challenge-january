import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import localforage from 'localforage'

const isBrowser = typeof window !== 'undefined'
let token = ''
if (isBrowser) {
  localforage.getItem('id_token').then(value => {
    console.log(value)
    token = value
  })
}

export const client = new ApolloClient({
  uri: process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT,
  fetch,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

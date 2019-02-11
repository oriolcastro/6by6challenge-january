import './src/styles/styles.css'

import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { ApolloProvider } from 'react-apollo'
import { client } from './src/utils/apolloClient'
import { initializeFirebase, setServiceWorker } from './src/utils/firebase'

// Wrap the main component with the provedier from Apollo to query the graphql endpoint
// Add provider for the Date Picker
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {element}
    </MuiPickersUtilsProvider>
  </ApolloProvider>
)

export const onServiceWorkerInstalled = ({ serviceWorker }) => {
  setServiceWorker(serviceWorker)
}

export const onInitialClientRender = () => {
  initializeFirebase()
}

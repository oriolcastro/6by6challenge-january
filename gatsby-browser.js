import './src/styles/styles.css'

import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { ApolloProvider } from 'react-apollo'
import { client } from './src/utils/apolloClient'

import Layout from './src/components/layout'
import withRoot from './src/withRoot'

const WithRoot = withRoot(props => props.children)

// Wrap with the WithRoot component from Material-ui
// Wrap the main component with the provider from Apollo to query the graphql endpoint
// Add provider for the Date Picker
export const wrapRootElement = ({ element }) => (
  <WithRoot key={Math.random()}>
    <ApolloProvider client={client}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {element}
      </MuiPickersUtilsProvider>
    </ApolloProvider>
  </WithRoot>
)

// Wrap page element with the Layout component to use page transitions
export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

// Prevent page scrolling before the transition is finished
const transitionDelay = 250
export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
  } else {
    const savedPosition = getSavedScrollPosition(location)
    window.setTimeout(
      () => window.scrollTo(...(savedPosition || [0, 0])),
      transitionDelay
    )
  }
  return false
}

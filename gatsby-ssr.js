/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { renderToString } from 'react-dom/server'
import JssProvider from 'react-jss/lib/JssProvider'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { ApolloProvider } from 'react-apollo'
import getPageContext from './src/getPageContext'
import { client } from './src/apollo/client'

// Mayerial-ui code to replace jss classes
function replaceRenderer({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) {
  // Get the context of the page to collected side effects.
  const muiPageContext = getPageContext()

  const bodyHTML = renderToString(
    <JssProvider registry={muiPageContext.sheetsRegistry}>
      {bodyComponent}
    </JssProvider>
  )

  replaceBodyHTMLString(bodyHTML)
  setHeadComponents([
    <style
      type="text/css"
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{
        __html: muiPageContext.sheetsRegistry.toString(),
      }}
    />,
  ])
}

export default replaceRenderer

// Wrap the main component with the provedier from Apollo to query the graphql endpoint
// Add provider for the Date Picker
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {element}
    </MuiPickersUtilsProvider>
  </ApolloProvider>
)

/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { renderToString } from 'react-dom/server'
import JssProvider from 'react-jss/lib/JssProvider'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import getPageContext from './src/getPageContext'

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

// Add provider for the Date Picker
export const wrapRootElement = ({ element }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {element}
  </MuiPickersUtilsProvider>
)

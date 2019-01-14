import './src/styles/styles.css'

import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

// Add provider for the Date Picker
export const wrapRootElement = ({ element }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {element}
  </MuiPickersUtilsProvider>
)

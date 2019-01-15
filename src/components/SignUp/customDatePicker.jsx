import React, { Component } from 'react'
import { InlineDatePicker } from 'material-ui-pickers'

class CustomDatePicker extends Component {
  handleChange = value => {
    this.props.onChange('birthday', value)
  }
  handleBlur = () => {
    this.props.onBlur('birthday', true)
  }
  render() {
    return (
      <InlineDatePicker
        id="birthday"
        label="Data de naixement"
        format="dd/MM/yyyy"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
        keyboard
        disableFuture
        openToYearSelection
        variant="outlined"
        required
        margin="normal"
        fullWidth
      />
    )
  }
}

export default CustomDatePicker

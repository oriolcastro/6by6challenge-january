import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { Formik } from 'formik'

import CustomDatePicker from '../SignUp/customDatePicker'

const Form = props => {
  const {
    values: { separationDate },
    handleSubmit,
    handleChange,
    setFieldTouched,
    setFieldValue,
  } = props
  const change = (name, e) => {
    e.persist()
    handleChange(e)
    setFieldTouched(name, true, false)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomDatePicker
          name="separationDate"
          value={separationDate}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Assigna
        </Button>
      </form>
    </>
  )
}

class AssignPlayers extends Component {
  constructor(props) {
    super(props)
    this.state = { separationDate: '' }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  submitForm = values => {
    const payload = {
      separationDate: values.separationDate,
    }
    axios
      .post('.netlify/functions/generateAndAssignKills', {
        payload,
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    console.log('Players assigned')
  }

  render() {
    const values = {
      separationDate: new Date('2003-02-25'),
    }
    return (
      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h6" paragraph>
          Assigna els emparellaments
        </Typography>
        <Formik
          render={props => <Form {...props} />}
          initialValues={values}
          onSubmit={this.submitForm}
        />

        {/* <TextField
          id="separationDate"
          name="separationDate"
          helperText="Introdueix la data amb el format 1987-10-05"
          value={this.state.separationDate}
          onChange={this.handleChange('separationDate')}
          label="Data de naixement per a fer la separació"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Assigna
        </Button> */}
      </div>
    )
  }
}

export default AssignPlayers

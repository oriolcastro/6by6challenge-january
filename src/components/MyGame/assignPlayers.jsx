import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import axios from 'axios'
import { Formik } from 'formik'

import CustomDatePicker from '../SignUp/customDatePicker'

const Form = props => {
  const {
    values: { birthday, listselector },
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
          name="birthday"
          value={birthday}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <div style={{ margin: '16px' }}>
          <FormLabel component="legend">
            Seleccions la llista a generar:
          </FormLabel>
          <RadioGroup
            aria-label="List"
            name="listselector"
            value={listselector}
            onChange={change.bind(null, 'listselector')}
          >
            <FormControlLabel
              value="young"
              control={<Radio color="primary" />}
              label="Llista jove"
            />
            <FormControlLabel
              value="old"
              control={<Radio color="primary" />}
              label="Llista gran"
            />
          </RadioGroup>
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Genera
        </Button>
      </form>
    </>
  )
}

class AssignPlayers extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  submitForm = values => {
    const payload = {
      separationDate: values.birthday,
      listSelector: values.listselector,
    }
    //TODO: In production change to relative url
    axios
      .post(
        'https://dev--pastanagapp-6by6january.netlify.com/.netlify/functions/generateAndAssignKills',
        {
          payload,
        }
      )
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
      birthday: new Date('2003-02-25'),
      listselector: 'young',
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
      </div>
    )
  }
}

export default AssignPlayers

import React, { Component } from 'react'
import { Formik } from 'formik'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { string, object, ref } from 'yup'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

import Form from './form'
import SignupNotification from './notification'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
})

const validationSchema = object({
  name: string('Introdueix el teu nom').required('El nom és necessari'),
  firstsurname: string('Introdueix el teu primer cognom'),
  secondsurname: string('Introdueix el teu segon cognom'),
  mobile: string('Introdueix el teu número de mòbil')
    .matches(
      /^[6|7|9][\s|\-|\.]?([0-9][\s|\-|\.]?){8}$/,
      'El mòbil introduit no és vàlid'
    )
    .required('El mòbil és necessari'),
  email: string('Introdueix el teu correu electrònic')
    .email('Introdueix un correu electrònic vàlid')
    .required('El correu electrònic és necessari'),
  password: string('')
    .min(8, 'La contrasenya ha de tenir com a mínim 8 caràcters')
    .required('Introdueix una contrasenya'),
  confirmPassword: string('Introdueix la contrasenya')
    .required('Confirma la teva contrasenya')
    .oneOf([ref('password')], 'Les dues contrasenyes no coincideixen'),
})

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerSignedUp: false,
    }
  }
  submitForm = (values, { resetForm }) => {
    const payload = {
      name: values.name,
      firstSurname: values.firstSurname,
      secondSurname: values.secondSurname,
      mobile: values.mobile,
      email: values.email,
      birthday: values.birthday,
      team: values.team,
      password: values.password,
    }
    console.log(payload)

    axios
      .post('.netlify/functions/signupplayer', {
        payload,
      })
      .then(response => {
        console.log(response.data)
        resetForm()
        this.setState({
          playerSignedUp: true,
        })
      })
      .catch(error => {
        console.log(error)
      })
    console.log('Form submited')
  }

  render() {
    const { classes } = this.props
    const { playerSignedUp } = this.state
    const values = {
      name: '',
      firstSurname: '',
      secondSurname: '',
      mobile: '',
      email: '',
      birthday: new Date(),
      team: '',
      password: '',
      confirmPassword: '',
    }
    return (
      <>
        <div style={{ maxWidth: '600px', margin: 'auto' }} id="SignupForm">
          <Paper classes={{ root: classes.root }}>
            <Typography variant="h5" gutterBottom>
              Formulari d'inscripció
            </Typography>
            <Formik
              render={props => <Form {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitForm}
            />
          </Paper>
          <SignupNotification open={playerSignedUp} />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(SignUp)

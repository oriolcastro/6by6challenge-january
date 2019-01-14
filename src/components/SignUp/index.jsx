import React, { Component } from 'react'
import { Formik } from 'formik'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { string, object, ref } from 'yup'
import Typography from '@material-ui/core/Typography'

import Form from './form'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
      .spacing.unit * 5}px`,
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
  }

  submitForm = ({
    name,
    firstSurname,
    secondSurname,
    mobile,
    email,
    city,
    birthday,
    team,
    password,
  }) => {
    console.log('Form submited')
  }

  render() {
    const { classes } = this.props
    const values = {
      name: '',
      firstSurname: '',
      secondSurname: '',
      mobile: '',
      email: '',
      city: '',
      birthday: new Date(),
      team: '',
      password: '',
      confirmPassword: '',
    }
    return (
      <>
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
          <Paper classes={{ root: classes.root }}>
            <Typography variant="h4" gutterBottom>
              Formulari d'inscripció
            </Typography>
            <Formik
              render={props => <Form {...props} />}
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={this.submitForm}
            />
          </Paper>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(SignUp)

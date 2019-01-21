import React, { Component } from 'react'
import { Formik } from 'formik'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { string, object, ref, boolean, date } from 'yup'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

import Form from './form'
import SignupNotification from './notification'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginBottom: theme.spacing.unit * 5,
  },
  privacyPolicy: {
    fontSize: '0.8rem',
    whiteSpace: 'pre-wrap',
  },
})

const validationSchema = object({
  name: string().required('El nom és necessari'),
  firstsurname: string('Introdueix el teu primer cognom'),
  secondsurname: string('Introdueix el teu segon cognom'),
  mobile: string('Introdueix el teu número de mòbil')
    .matches(
      /^[6|7|9][\s|\-|\.]?([0-9][\s|\-|\.]?){8}$/,
      'Introdueix un número de mòbil valid.'
    )
    .required('El mòbil és necessari.'),
  email: string('Introdueix el teu correu electrònic.')
    .email('Introdueix un correu electrònic vàlid.')
    .required('El correu electrònic és necessari.'),
  birthday: date()
    .max('2003-03-25', 'Per participar al joc has de tenir 16 anys')
    .required("Has d'indicar la teva data de naixement."),
  password: string('')
    .min(8, 'La contrasenya ha de tenir com a mínim 8 caràcters')
    .required('Introdueix una contrasenya'),
  confirmPassword: string('Introdueix la contrasenya')
    .required('Confirma la teva contrasenya')
    .oneOf([ref('password')], 'Les dues contrasenyes no coincideixen'),
  privacyCheckbox: boolean().oneOf([true], 'Must Accept Terms and Conditions'),
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
        gtag('event', 'form submit', {
          event_category: 'interacció',
          event_label: 'Formulari inscripció',
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
      birthday: new Date('2003-02-25'),
      team: '',
      password: '',
      confirmPassword: '',
      privacyCheckbox: false,
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
          <Typography variant="subtitle1">Política de privacitat</Typography>
          <Typography
            variant="body2"
            align="justify"
            classes={{ body2: classes.privacyPolicy }}
          >
            <b>Responsable:</b> La Unió Vilanovina és la responsable del
            tractament d'aquestes dades.{'\n'}
            <b>Finalitat:</b> Les dades seran utilitzades només per allò relatiu
            al joc de La Pastanaga del Rei.{'\n'}
            <b>Destinataris:</b> Les dades no seran cedides a tercers en cap
            cas.{'\n'}
            <b>Legitimació:</b> L'usuari expressa el seu consentiment en marcar
            les caselles del formulari.{'\n'}
            <b>Drets:</b> Podeu exercir els vostres drets d'accés, rectificació,
            limitació o supressió de les dades a contacte@lapastanagadelrei.cat.
          </Typography>
          <SignupNotification open={playerSignedUp} />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(SignUp)

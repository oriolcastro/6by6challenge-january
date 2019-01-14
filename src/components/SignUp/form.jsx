import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { InlineDatePicker } from 'material-ui-pickers'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

class FormikDatePicker extends Component {
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
// TODO: Passar el array d'entitats des del parent component un cop feta query a Hasura
const entitats = [
  {
    value: 'La Unió',
    label: 'La Unió',
  },
  {
    value: 'Talaia',
    label: 'Talaia',
  },
  {
    value: 'Agrupa',
    label: 'Agrupa',
  },
]

const Form = props => {
  const {
    values: {
      name,
      firstSurname,
      secondSurname,
      mobile,
      email,
      city,
      birthday,
      team,
      password,
      confirmPassword,
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
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
        <TextField
          id="name"
          name="name"
          helperText={touched.name ? errors.name : ''}
          error={touched.name && Boolean(errors.name)}
          label="Nom"
          value={name}
          onChange={change.bind(null, 'name')}
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          id="firstSurname"
          name="firstSurname"
          helperText={touched.firstSurname ? errors.firstSurname : ''}
          error={touched.firstSurname && Boolean(errors.firstSurname)}
          label="Primer cognom"
          value={firstSurname}
          onChange={change.bind(null, 'firstSurname')}
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          id="secondSurname"
          name="secondSurname"
          helperText={touched.secondSurname ? errors.secondSurname : ''}
          error={touched.secondSurname && Boolean(errors.secondSurname)}
          value={secondSurname}
          onChange={change.bind(null, 'secondSurname')}
          label="Segon cognom"
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          id="mobile"
          name="mobile"
          helperText={touched.mobile ? errors.mobile : ''}
          error={touched.mobile && Boolean(errors.mobile)}
          value={mobile}
          onChange={change.bind(null, 'mobile')}
          label="Telèfon mòbil"
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          id="email"
          name="email"
          helperText={touched.email ? errors.email : ''}
          error={touched.email && Boolean(errors.email)}
          value={email}
          onChange={change.bind(null, 'email')}
          label="Correu electrònic"
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          id="city"
          name="city"
          helperText={touched.city ? errors.city : ''}
          error={touched.city && Boolean(errors.city)}
          value={city}
          onChange={change.bind(null, 'city')}
          label="Població"
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <FormikDatePicker
          name="birthday"
          value={birthday}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <TextField
          id="team"
          select
          name="team"
          value={team}
          helperText={touched.team ? errors.team : ''}
          error={touched.team && Boolean(errors.team)}
          onChange={change.bind(null, 'team')}
          label="Entitat"
          fullWidth
          variant="outlined"
          margin="normal"
          required
        >
          {entitats.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="password"
          name="password"
          helperText={touched.password ? errors.password : ''}
          error={touched.password && Boolean(errors.password)}
          value={password}
          onChange={change.bind(null, 'password')}
          type="password"
          label="Contrasenya"
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          helperText={touched.confirmPassword ? errors.confirmPassword : ''}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          value={confirmPassword}
          onChange={change.bind(null, 'confirmPassword')}
          type="password"
          label="Confirma la contrasenya"
          fullWidth
          variant="outlined"
          margin="normal"
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Envia
        </Button>
      </form>
    </>
  )
}

export default Form

import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Query } from 'react-apollo'

import { GET_TEAMS } from '../../apollo/queries'
import CustomSelect from './customSelect'
import CustomDatePicker from './customDatePicker'

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
        <CustomDatePicker
          name="birthday"
          value={birthday}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />

        <Query query={GET_TEAMS}>
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error: ${error}`
            const teams = data.teams.map(t => ({
              value: t.name,
              label: t.name,
            }))
            return (
              <CustomSelect
                options={teams}
                name="team"
                value={team}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
            )
          }}
        </Query>
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

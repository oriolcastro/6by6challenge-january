import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Login } from '../../utils/auth'

export const LoginComponent = () => (
  <>
    <Typography variant="h5" paragraph>
      Pàgina només visibles per a jugadors registrats.
    </Typography>
    <Typography variant="subtitle2" paragraph>
      Accedeix amb el correu electrònic i contrasenya que vas introduir en fer
      la inscripció per a consultar les teves dades del joc.
    </Typography>
    <Button variant="contained" color="primary" onClick={() => Login()}>
      Inicia la sessió
    </Button>
  </>
)

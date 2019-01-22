import React from 'react'
import Typography from '@material-ui/core/Typography'

import AssignPlayers from './assignPlayers'
import ReviewPlayers from './reviewPlayers'

const AdminOptions = () => (
  <>
    <Typography variant="h5" paragraph>
      Opcions per administradors
    </Typography>
    <AssignPlayers />
    <ReviewPlayers />
  </>
)

export default AdminOptions

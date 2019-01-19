import React from 'react'
import Typography from '@material-ui/core/Typography'
import withRoot from '../withRoot'

import Layout from '../components/layout'

const InfoPage = () => (
  <Layout>
    <Typography variant="h5">
      Pàgina amb informació sobre el joc i l'aplicació.
    </Typography>
  </Layout>
)

export default withRoot(InfoPage)

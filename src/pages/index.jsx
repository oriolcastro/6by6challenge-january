import React from 'react'
import Typography from '@material-ui/core/Typography'
import withRoot from '../withRoot'

import Layout from '../components/layout'
import SignUp from '../components/SignUp/index'
import LandingHero from '../components/landingHero'
import SEO from '../components/seo'
import Countdown from '../components/countdown'

const IndexPage = () => (
  <Layout>
    <SEO
      title="Resultats"
      description="Consulta els resultats en viu del joc."
      keywords={['pwa', 'carnaval', 'vilanova']}
    />
    {/* <LandingHero />
    <SignUp /> */}
    <Typography variant="h5" paragraph>
      Temps per l'inici del joc
    </Typography>
    <Countdown date="2019-02-24T00:00:00" />
  </Layout>
)

export default withRoot(IndexPage)

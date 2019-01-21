import React from 'react'
import withRoot from '../withRoot'

import Layout from '../components/layout'
import SignUp from '../components/SignUp/index'
import LandingHero from '../components/landingHero'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO
      title="Resultats"
      description="Consulta els resultats en viu del joc."
      keywords={['pwa', 'carnaval', 'vilanova']}
    />
    <LandingHero />
    <SignUp />
  </Layout>
)

export default withRoot(IndexPage)

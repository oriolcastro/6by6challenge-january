import React from 'react'

import SignUp from '../components/SignUp/index'
import LandingHero from '../components/landingHero'
import SEO from '../components/seo'

const IndexPage = () => (
  <>
    <SEO
      title="Resultats"
      description="Consulta els resultats en viu del joc."
      keywords={['pwa', 'carnaval', 'vilanova']}
    />
    <LandingHero />
    <SignUp />
  </>
)

export default IndexPage

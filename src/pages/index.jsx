import React from 'react'

import SignUp from '../components/SignUp/index'
import LandingHero from '../components/LandingHero'
import SEO from '../components/Seo'

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

import React from 'react'
import withRoot from '../withRoot'

import Layout from '../components/layout'
import SEO from '../components/seo'
import SignUp from '../components/SignUp/index'
import LandingHero from '../components/landingHero'

const IndexPage = () => (
  <Layout>
      {/* <SEO title="Home" keywords={['pwa', 'carnaval', 'vilanova']} /> */}
      <LandingHero />
      <SignUp />
  </Layout>
)

export default withRoot(IndexPage)

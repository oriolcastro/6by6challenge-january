import React from 'react'
import Typography from '@material-ui/core/Typography'
import withRoot from '../withRoot'

import Layout from '../components/layout'
import LandingHero from '../components/landingHero'
import Countdown from '../components/countdown'

const IndexPage = () => (
  <Layout>
    {/* <SEO title="Home" keywords={['pwa', 'carnaval', 'vilanova']} /> */}
    <div style={{ marginBottom: '48px' }}>
      <Typography variant="h3" align="center" paragraph>
        Falten{' '}
      </Typography>
      <Countdown date="2019-02-28T00:0:01" />
      <Typography variant="h4" align="center" paragraph>
        per començar el joc
      </Typography>
    </div>
    <LandingHero />
    {/* <SignUp /> */}
  </Layout>
)

export default withRoot(IndexPage)

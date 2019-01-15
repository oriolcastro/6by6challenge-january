import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import SignUp from '../components/SignUp/index'
import withRoot from '../withRoot'

const IndexPage = () => (
  <Layout>
    {/* <SEO title="Home" keywords={['pwa', 'carnaval', 'vilanova']} /> */}
    <SignUp />
  </Layout>
)

export default withRoot(IndexPage)

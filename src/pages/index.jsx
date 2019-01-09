import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['pwa', 'carnaval', 'vilanova']} />
    <h1>Benvinguts a la PastanagApp</h1>
  </Layout>
)

export default IndexPage

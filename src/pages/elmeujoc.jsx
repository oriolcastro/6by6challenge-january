import React from 'react'
import withRoot from '../withRoot'

import Layout from '../components/layout'
import MyGame from '../components/MyGame/index'
import SEO from '../components/seo'

const MyGamePage = () => (
  <Layout>
    <SEO title="El meu joc" description="Accedeix a les teves dades del joc i coneix la pròxima victima."/>
    <MyGame />
  </Layout>
)

export default withRoot(MyGamePage)

import React from 'react'
import { Router } from '@reach/router'

import withRoot from '../withRoot'
import Layout from '../components/layout'
import MyGame from '../components/MyGame/index'
import SEO from '../components/seo'
import PrivateRoute from '../components/privateRoute'
import LoginComponent from '../components/MyGame/login'

const MyGamePage = () => (
  <Layout>
    <SEO
      title="El meu joc"
      description="Accedeix a les teves dades del joc i coneix la pròxima victima."
    />
    <Router>
      <PublicRoute path="/elmeujoc">
        <PrivateRoute path="/" component={MyGame} />
        <LoginComponent path="/login" />
      </PublicRoute>
    </Router>
  </Layout>
)

function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default withRoot(MyGamePage)

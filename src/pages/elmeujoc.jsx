import React from 'react'
import withRoot from '../withRoot'

import Layout from '../components/layout'
import PrivateRoute from '../components/privateRoute'

import { MyGame } from '../components/MyGame/index'

const MyGamePage = () => (
  <Layout>
    <MyGame />
  </Layout>
)

export default withRoot(MyGamePage)

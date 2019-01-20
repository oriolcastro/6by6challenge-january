import React from 'react'

import MyGame from '../components/MyGame/index'
import SEO from '../components/Seo'

const MyGamePage = () => (
  <>
    <SEO
      title="El meu joc"
      description="Accedeix a les teves dades del joc i coneix la pròxima victima."
    />
    <MyGame />
  </>
)

export default MyGamePage

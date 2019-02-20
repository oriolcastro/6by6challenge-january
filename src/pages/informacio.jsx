import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import withRoot from '../withRoot'
import Layout from '../components/layout'
import SEO from '../components/seo'
import DevInfo from '../components/devInfo'

const InfoPage = ({ data }) => (
  <Layout>
    <SEO
      title="Informació"
      description="Tota la informació sobre el joc i l'aplicació que necessites"
    />
    <Grid container justify="space-between" spacing={24}>
      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
        <Img fluid={data.imageSharp.fluid} />
      </Grid>
      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
        <Typography variant="body2" align="justify" gutterBottom>
          Benvingudes a la web de <strong>La Pastanaga del Rei</strong>, una nova eina per a fer
          més dinàmic i atractiu el joc per excelència del Carnaval de Vilanova.
          Podeu consultar de forma pública i en temps real el nombre de persones
          que han estat eliminades avui i des de l'inici del joc, així com veure
          qui son i en quina entitat participaven.
        </Typography>
        <Typography variant="body2" align="justify">
          Les persones que us heu inscrit al joc també podeu accedir a la pàgina 
           <strong> "El meu joc"</strong> i gaudir de experiencia amb que hem dissenyat la web. Per
          accedir heu de fer servir el correu electrònic i contrasenya que vau
          introduir al forumulari d'inscripció. Un cop dins podreu:
        </Typography>
        <Typography variant="body2" align="justify">
          <ul>
            <li>Consultar les dades de la persona a la que heu de matar.</li>
            <li>Veure la llista de persones que ja heu eliminat.</li>
            <li>
              Indicar que heu eliminat a la vostra víctima o validar que us han
              eliminat a vosaltres.
            </li>
            <li>Rebre una notificació si t'han eliminat del joc.</li>
            <li>
              Intercanviar-vos la informació igual com us passeu el clauer
              físic.
            </li>
          </ul>
        </Typography>
        <DevInfo />
      </Grid>
    </Grid>
    
  </Layout>
)

export default withRoot(InfoPage)

export const query = graphql`
  query InfoPageQuery {
    imageSharp(fixed: { originalName: { eq: "hero.jpg" } }) {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`

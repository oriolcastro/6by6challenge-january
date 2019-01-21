import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const LandingHero = () => (
  <div>
    <Grid container justify="space-between" spacing={24}>
      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
        <Typography variant="h4" gutterBottom>
          Benvinguts a la nova web de la Pastanga del Rei
        </Typography>
        <Typography variant="body2" align="justify" paragraph>
          L'any passat ja vàrem fer les inscripcions de forma telemàtica però
          aquest any anem un pas més enllà. Estem preparant una sorpresa que
          farà el joc molt més interactiu. De moment podeu fer la inscripció i
          donar-vos d'alta com usuaris de la web a través del formulari. Per tal
          que tot funcioni heu de ser conscients que si us inscriviu, haureu de
          venir a buscar el material els dies indicats, de no ser així quedareu
          automàticament eliminats del joc..
        </Typography>
        <List>
          <ListItem divider>
            <ListItemText
              primaryTypographyProps={{ variant: 'body2', align: 'justify' }}
            >
              RECOLLIDA DEL MATERIAL: X i X de febrer de 19 a 21h al local de la
              Unió Vilanovina (Plaça del Pou, 4, de Vilanova i la Geltrú) S'ha
              de presentar el DNI o una autorització en cas de recollir el
              material d'una altra persona.
            </ListItemText>
          </ListItem>
          <ListItem divider>
            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
              PREU: 2€ (a pagar al recollir del material)
            </ListItemText>
          </ListItem>
          <ListItem divider>
            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
              INICI del joc: X de febrer.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
              CLOENDA del joc: XX de març al local de la Unió Vilanovina.
            </ListItemText>
          </ListItem>
        </List>
        <Typography variant="body2" align="justify">
          Per qualsevol dubte us podeu posar en contacte amb l'organització del
          joc a travès del correu{' '}
          <a href="mailto:lapastanagadelrei@gmail.com">
            lapastanagadelrei@gmail.com
          </a>
        </Typography>
      </Grid>
      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
        <StaticQuery
          query={graphql`
            query HeroQuery {
              imageSharp(fixed: { originalName: { eq: "hero.jpg" } }) {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          `}
          render={data => <Img fluid={data.imageSharp.fluid} />}
        />
      </Grid>
    </Grid>
  </div>
)

export default LandingHero

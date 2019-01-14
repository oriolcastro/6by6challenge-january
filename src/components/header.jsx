import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Header = ({ siteTitle, siteLogo }) => (
  <div style={{ margin: '16px' }}>
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Img fixed={siteLogo} />{' '}
      </Grid>
      <Grid item>
        <Typography color="primary" variant="h2">
          <Link to="/">{siteTitle}</Link>
        </Typography>
      </Grid>
      <Grid item>
        <AnchorLink href="#SignupForm" offSet="20">
          <Button variant="text">Apunta&apos;t</Button>
        </AnchorLink>
      </Grid>
    </Grid>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}
export default Header

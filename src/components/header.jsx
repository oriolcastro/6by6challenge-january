import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

import MobileAppBar from './MobileAppBar'
import SEO from './Seo'

const Header = ({ siteTitle, siteLogo }) => (
  <>
    {/* Desktop header */}
    <Hidden smDown implementation="css">
      <div style={{ margin: '16px' }}>
        <Grid container justify="center">
          <Grid item>
            <Link to="/" />
            {siteLogo ? (
              <Img fixed={siteLogo} />
            ) : (
              <Typography color="primary" variant="h2">
                {siteTitle}
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </Hidden>
    {/* Mobile header */}
    <Hidden mdUp implementation="css">
      <MobileAppBar siteTitle={siteTitle} />
    </Hidden>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Header

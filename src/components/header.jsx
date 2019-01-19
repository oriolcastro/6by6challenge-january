import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import MobileAppBar from './mobileAppBar'

const Header = ({ siteTitle, siteLogo }) => {
  return (
    <>
      {/* Desktop header */}
      <Hidden smDown>
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
      <Hidden mdUp>
        <MobileAppBar siteTitle={siteTitle} />
      </Hidden>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Header

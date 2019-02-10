import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'

import AnchorLink from 'react-anchor-link-smooth-scroll'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}

const Header = ({ siteTitle, siteLogo, classes }) => (
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
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {siteTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </Hidden>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default withStyles(styles)(Header)

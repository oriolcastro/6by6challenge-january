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
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import { isAuthenticated, Login } from '../utils/auth'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}

const Header = ({ siteTitle, siteLogo, classes }) => {
  const authenticated = isAuthenticated()

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
        <div>
          <AppBar>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                {siteTitle}
              </Typography>
              {!authenticated && (
                <Button onClick={() => Login()}>Inicia la sessió</Button>
              )}
              {authenticated && (
                <IconButton>
                  <AccountCircle />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </Hidden>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default withStyles(styles)(Header)

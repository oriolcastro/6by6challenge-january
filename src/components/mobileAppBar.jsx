import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'

import { isAuthenticated, Login, Logout } from '../utils/auth'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}

class MobileAppBar extends Component {
  constructor(props) {
    super(props)
    this.state = { authenticated: true, anchorEl: null }
  }

  componentDidMount() {
    this.setState({ authenticated: isAuthenticated() })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes, siteTitle } = this.props
    const { authenticated, anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {siteTitle}
          </Typography>
          {!authenticated && (
            <Button onClick={() => Login()}>Inicia la sessió</Button>
          )}
          {authenticated && (
            <>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
                <MenuItem id="logout" onClick={() => Logout()}>
                  Surt
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(MobileAppBar)

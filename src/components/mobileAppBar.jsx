import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Avatar from '@material-ui/core/Avatar'
import { navigate } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'

import { isAuthenticated, Login, Logout, getUserInfo } from '../utils/auth'
import NetworkIndicator from './networkIndicator'
import NotificationIndicator from './notificationsIndicator'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    marginRight: 'auto',
  },
}

class MobileAppBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      anchorEl: null,
      avatarSrc: '',
      hasNotificationAPI: false,
    }
  }

  componentDidMount() {
    // Let's check if the browser supports notifications and there isn't any token saved
    if ('Notification' in window) {
      console.log('This browser support notifications')
      this.setState({ hasNotificationAPI: true })
    }
    this.setState({
      avatarSrc: localStorage.getItem('avatar_src'),
      authenticated: isAuthenticated(),
    })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes, siteTitle } = this.props
    const {
      authenticated,
      anchorEl,
      avatarSrc,
      hasNotificationAPI,
    } = this.state
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
              <NetworkIndicator />
              {hasNotificationAPI && <NotificationIndicator />}
              <Avatar
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                src={avatarSrc}
              />
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
                <MenuItem
                  onClick={() => {
                    navigate('/elmeujoc')
                    this.handleClose
                  }}
                >
                  El meu perfil
                </MenuItem>
                <MenuItem id="logout" onClick={() => Logout()}>
                  Tanca la sessió
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

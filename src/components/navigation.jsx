import React, { Component } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import PollIcon from '@material-ui/icons/Poll'
import UserIcon from '@material-ui/icons/Person'
import InfoIcon from '@material-ui/icons/Info'
import { withStyles } from '@material-ui/core/styles'
import { navigate } from 'gatsby'
import { Location } from '@reach/router'

const styles = theme => ({
  navRoot: {
    // backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    bottom: 0,
    zIndex: 1000,
    width: '100%',
  },
})

class Navigation extends Component {
  handleChange = (event, value) => {
    navigate(value)
  }

  render() {
    const { classes } = this.props

    return (
      <Location>
        {({ location }) => {
          return (
            <BottomNavigation
              value={location.pathname}
              onChange={this.handleChange}
              showLabels
              classes={{ root: classes.navRoot }}
            >
              <BottomNavigationAction
                value="/"
                label="Resultats"
                icon={<PollIcon />}
              />
              <BottomNavigationAction
                value="/elmeujoc"
                label="El meu joc"
                icon={<UserIcon />}
              />
              <BottomNavigationAction
                value="/informacio"
                label="Informació"
                icon={<InfoIcon />}
              />
            </BottomNavigation>
          )
        }}
      </Location>
    )
  }
}

export default withStyles(styles)(Navigation)

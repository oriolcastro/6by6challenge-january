import React from 'react'
import { navigate } from 'gatsby'
import { isAuthenticated } from '../utils/auth'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isAuthenticated() && location.pathname !== `/login`) {
    // If the user is not logged in, redirect to the login page.
    navigate(`/login`)
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute

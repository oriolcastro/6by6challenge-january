import React from 'react'
import { navigate } from 'gatsby'
import { isAuthenticated } from '../utils/auth'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isAuthenticated() && location.pathname !== `/elmeujoc/login`) {
    // If the user is not logged in, redirect to the login page.
    navigate(`/elmeujoc/login`)
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute

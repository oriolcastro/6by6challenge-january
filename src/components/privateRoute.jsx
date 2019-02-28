import React from 'react'
import { navigate } from 'gatsby'
import { isAuthenticated } from '../utils/auth'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const authenticated = isAuthenticated
  if (
    !authenticated &&
    location.pathname !== `/elmeujoc/login` &&
    typeof window !== 'undefined'
  ) {
    // If the user is not logged in, redirect to the login page.
    navigate(`/elmeujoc/login`)
    console.log('Private route invoqued')
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute

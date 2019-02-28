import React from 'react'
import { navigate } from 'gatsby'
import { isAuthenticated } from '../utils/auth'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  console.log(!isAuthenticated())
  if (
    !isAuthenticated() &&
    location.pathname !== `/elmeujoc/login` &&
    typeof window !== 'undefined'
  ) {
    console.log(location.pathname !== `/elmeujoc/login`)
    console.log(typeof window !== 'undefined')
    // If the user is not logged in, redirect to the login page.
    navigate(`/elmeujoc/login`)
    console.log('Private route invoqued')
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute

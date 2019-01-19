import auth0js from 'auth0-js'
import { navigate } from 'gatsby'

const isBrowser = typeof window !== 'undefined'

let profile = false

// Only instantiate Auth0 if we’re in the browser.
const auth0 = isBrowser
  ? new auth0js.WebAuth({
      domain: process.env.GATSBY_AUTH0_DOMAIN,
      clientID: process.env.GATSBY_AUTH0_CLIENT_ID,
      redirectUri: process.env.GATSBY_AUTH0_CALLBACK,
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  : {}

export const Login = () => {
  if (!isBrowser) {
    return
  }
  auth0.authorize()
}

export const Logout = () => {
  if (isBrowser) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user')
  }

  // Remove the locally cached profile to avoid confusing errors.
  profile = false
  navigate('/')
}

const setSession = authResult => {
  if (!isBrowser) {
    return
  }

  const expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  )

  localStorage.setItem('access_token', authResult.accessToken)
  localStorage.setItem('id_token', authResult.idToken)
  localStorage.setItem('expires_at', expiresAt)

  return true
}

export const handleAuthentication = callback => {
  if (!isBrowser) {
    return
  }

  auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
    } else if (err) {
      console.error(err)
    }
  })
}

export const isAuthenticated = () => {
  if (!isBrowser) {
    // For SSR, we’re never authenticated.
    return false
  }

  const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

export const getAccessToken = () => {
  if (!isBrowser) {
    return ''
  }

  return localStorage.getItem('access_token')
}

export const getUserInfo = () =>
  new Promise((resolve, reject) => {
    // If the user has already logged in, don’t bother fetching again.
    if (profile) {
      resolve(profile.email)
    }

    const accessToken = getAccessToken()

    if (!isAuthenticated()) {
      resolve({})
      return
    }

    auth0.client.userInfo(accessToken, (err, userProfile) => {
      if (err) {
        reject(err)
        return
      }

      profile = userProfile
      resolve(profile.email)
    })
  })

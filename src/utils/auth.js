import auth0js from 'auth0-js'
import axios from 'axios'
import localforage from 'localforage'
import { removeItemfromDB, addItemtoDb, getItemfromDB } from './db'

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
    localforage.removeItem('access_token')
    localforage.removeItem('id_token')
    localforage.removeItem('expires_at')
    localforage.removeItem('user')
    localforage.removeItem('avatar_src')
    localforage.removeItem('player_id')

    // localStorage.removeItem('access_token')
    // localStorage.removeItem('id_token')
    // localStorage.removeItem('expires_at')
    // localStorage.removeItem('user')
    // localStorage.removeItem('avatar_src')
    // localStorage.removeItem('player_id')
  }

  // Remove the locally cached profile to avoid confusing errors.
  profile = false
  // Navigate to homepage on logout forcing to render the page.
  if (process.env.NODE_ENV === 'development') {
    window.location.replace('http://localhost:8000/')
  } else {
    window.location.replace('https://www.lapastanagadelrei.cat/')
  }
}

const setSession = authResult => {
  if (!isBrowser) {
    return
  }

  const expiresAt = authResult.expiresIn * 1000 + new Date().getTime()

  console.log(authResult)
  localforage.setItem('access_token', authResult.accessToken)
  localforage.setItem('id_token', authResult.idToken)
  localforage.setItem('expires_at', expiresAt)
  // localStorage.setItem('access_token', authResult.accessToken)
  // localStorage.setItem('id_token', authResult.idToken)
  // localStorage.setItem('expires_at', expiresAt)
  axios({
    method: 'post',
    url: process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT,
    data: {
      query: `query get_my_id {
        players {
          player_id
        }
      }`,
    },
    headers: {
      Authorization: authResult.idToken ? `Bearer ${authResult.idToken}` : '',
    },
  })
    .then(res => {
      console.log(
        `Player logged ID saved locally with the uuid: ${
          res.data.data.players[0].player_id
        }`
      )
      localforage.setItem('player_id', res.data.data.players[0].player_id)

      // localStorage.setItem('player_id', res.data.data.players[0].player_id)
    })
    .catch(err => {
      console.log(err)
    })

  return true
}

export const handleAuthentication = callback => {
  if (!isBrowser) {
    return
  }

  auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
      getUserInfo().then(res => localforage.setItem('avatar_src', res.picture))
      // localStorage.setItem('avatar_src', res.picture))
    } else if (err) {
      console.error(err)
    }
  })
}

export const isAuthenticated = async () => {
  if (!isBrowser) {
    // For SSR, we’re never authenticated.
    return false
  }
  const value = await localforage.getItem('expires_at')
  if (value) {
    console.log(value)
    return new Date().getTime() < value
  }
  return false

  // const expiresAt = await getItemfromDB('expires_at')
  // const expiresAt = JSON.parse(expiresDate)
  // const isLoggedIn = new Date().getTime() < expiresAt
  // console.log('Is logged in?', isLoggedIn)
  // return isLoggedIn
}

export const getAccessToken = () => {
  if (!isBrowser) {
    return ''
  }
  localforage.getItem('access_token').then(value => {
    return value
  })
  // return localStorage.getItem('access_token')
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

      resolve(userProfile)
    })
  })

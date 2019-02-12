import firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
}

export const initializeFirebase = () => {
  firebase.initializeApp(config)
  console.log('Firebase initialized')
  firebase
    .messaging()
    .usePublicVapidKey(
      'BIOWKJDbssiAKXTSrAhdeIA7aTGPKVDUSfFeqSnSgKS2VybWVi7ZUvYZM09o3UW7YY-uc-x2dWH_El-s8fh6Mzo'
    )
}

export const askPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging()
    await messaging.requestPermission()
    const deviceToken = messaging.getToken()
    return deviceToken
  } catch (error) {
    return error
  }
}

export const monitorTokenRefresh = () => {
  const messaging = firebase.messaging()
  messaging.onTokenRefresh(() => {
    const refreshedToken = messaging.getToken()
    return refreshedToken
  })
  console.log('The token has not refreshed.')
}

export const manageOnMessage = () => {
  const messaging = firebase.messaging()
  messaging.onMessage(payload => {
    console.log('onMessage: ', payload)
  })
}

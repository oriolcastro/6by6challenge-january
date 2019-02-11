import firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  apiKey: 'AIzaSyCTV2pQ6qkfNh90IYWodvxeokuAYNkcdPY',
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  projectId: 'lapastanagadelrei-b19d0',
}

export const initializeFirebase = () => {
  firebase.initializeApp(config)
  console.log('Firebase initialized')
}

export const askPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging()
    await messaging.requestPermission()
    const deviceToken = messaging.getToken()
    console.log(`This is the firebase token: ${deviceToken}`)
    return deviceToken
  } catch (error) {
    return error
  }
}

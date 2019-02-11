import firebase from 'firebase/app'
import 'firebase/messaging'

const config = {
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
}

class Firebase {
  // static instance
  constructor() {
    // if (instance) {
    //   return instance
    // }
    if (typeof window !== 'undefined') {
      firebase.initializeApp(config)
      this.messaging = firebase.messaging()
      this.instance = this
    }
  }

  askPermissionToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging()
      await messaging.requestPermission()
      const deviceToken = messaging.getToken()
      console.log(`This is the firebase token: ${deviceToken}`)
      return deviceToken
    } catch (error) {
      console.log(error)
    }
  }
}

export default Firebase

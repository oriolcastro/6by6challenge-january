import React from 'react'

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
}

let firebaseInstance

const getFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  }

  firebase.initializeApp(config)
  firebaseInstance = firebase

  return firebase
}

// Context provider to pass the firebase object to the components that need to use it
const FirebaseContext = React.createContext(null)

class FirebaseProvider extends React.Component {
  state = {
    firebase: null,
  }

  componentDidMount() {
    const app = import('firebase/app')
    const messaging = import('firebase/messaging')
    Promise.all([app, messaging]).then(values => {
      const firebase = getFirebase(values[0])
      console.log('Firebase initialized')
      this.setState({ firebase: firebase })
    })
  }

  render() {
    const { children } = this.props
    const { firebase } = this.state
    return (
      <FirebaseContext.Provider value={firebase}>
        {children}
      </FirebaseContext.Provider>
    )
  }
}

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export { FirebaseProvider, withFirebase }

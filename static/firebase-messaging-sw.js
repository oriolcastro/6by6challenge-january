/* eslint-disable */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: '940834189237',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  const notification = payload.data.notification
  const { title, body, click_action } = JSON.parse(notification)
  // Customize notification here
  const notificationTitle = title
  const notificationOptions = {
    body: body,
    icon: '/icon.png',
    click_action: click_action,
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import NotificationsOff from '@material-ui/icons/NotificationsOff'
import NotificationsOn from '@material-ui/icons/Notifications'
import axios from 'axios'
import localforage from 'localforage'
import { withFirebase } from '../utils/firebase'
import { ADD_DEVICE_TOKEN } from '../utils/queries'

class NotificationIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = { isNotificationsOn: false }
  }

  componentDidMount() {
    if (Notification.permission === 'granted') {
      this.setState({ isNotificationsOn: true })
    } else {
      this.setState({ isNotificationsOn: false })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.firebase !== prevProps.firebase) {
      const messaging = this.props.firebase.messaging()
      messaging.onTokenRefresh(() => {
        const refreshedToken = messaging.getToken()
        this.submitDeviceToken(refreshedToken)
        console.log('Device token has refreshed')
      })
    }
  }

  submitDeviceToken = deviceToken => {
    let token = ''
    let player_id = ''
    if (typeof window !== 'undefined') {
      localforage.getItem('id_token').then(value => {
        token = value
      })
      localforage.getItem('player_id').then(value => {
        player_id = value
      })
      //token = localStorage.getItem('id_token')
      //player_id = localStorage.getItem('player_id')
    }
    axios({
      method: 'post',
      url: process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT,
      data: {
        query: ADD_DEVICE_TOKEN,
        variables: {
          device_token: deviceToken,
          player_id: player_id,
        },
      },
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    })
      .then(res => {
        console.log(res)
        localforage.setItem('deviceToken', deviceToken)
        //localStorage.setItem('deviceToken', deviceToken)
      })
      .catch(err => console.log(err))
  }

  handleNotificationRequest = async () => {
    const messaging = this.props.firebase.messaging()
    messaging.usePublicVapidKey(
      'BIOWKJDbssiAKXTSrAhdeIA7aTGPKVDUSfFeqSnSgKS2VybWVi7ZUvYZM09o3UW7YY-uc-x2dWH_El-s8fh6Mzo'
    )
    await messaging.requestPermission()
    const deviceToken = await messaging.getToken()
    console.log(deviceToken)
    this.submitDeviceToken(deviceToken)
    this.setState({ isNotificationsOn: true })
  }

  render() {
    const { isNotificationsOn } = this.state
    return (
      <>
        {isNotificationsOn ? (
          <IconButton color="inherit" disableRipple>
            <NotificationsOn />
          </IconButton>
        ) : (
          <IconButton onClick={this.handleNotificationRequest} color="inherit">
            <NotificationsOff />
          </IconButton>
        )}
      </>
    )
  }
}

export default withFirebase(NotificationIndicator)

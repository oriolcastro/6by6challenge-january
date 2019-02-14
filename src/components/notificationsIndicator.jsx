import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import NotificationIcon from '@material-ui/icons/NotificationsOff'
import axios from 'axios'

import {
  askPermissionToReceiveNotifications,
  monitorTokenRefresh,
  manageOnMessage,
} from '../utils/firebase'
import { ADD_DEVICE_TOKEN } from '../utils/queries'

class NotificationIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = { showNotificationIcon: false }
  }

  componentDidMount() {
    // Let's check if the browser supports notifications
    if ('Notification' in window && !localStorage.getItem('deviceToken')) {
      console.log('This browser support notifications')
      this.setState({ showNotificationIcon: true })
    }
    manageOnMessage()
    const refreshedToken = monitorTokenRefresh()
    if (refreshedToken) {
      let token = ''
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('id_token')
        player_id
      }
      axios({
        method: 'post',
        url: process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT,
        data: {
          query: ADD_DEVICE_TOKEN,
          variables: {
            device_token: refreshedToken,
            player_id: player_id,
          },
        },
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }

  handleNotificationRequest = () => {
    askPermissionToReceiveNotifications()
      .then(deviceToken => {
        let token = ''
        let player_id = ''
        if (typeof window !== 'undefined') {
          token = localStorage.getItem('id_token')
          player_id = localStorage.getItem('player_id')
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
            localStorage.setItem('deviceToken', deviceToken)
            this.setState({ showNotificationIcon: false })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
    const { showNotificationIcon } = this.state
    return (
      <>
        {showNotificationIcon && (
          <Button onClick={this.handleNotificationRequest}>
            <NotificationIcon />
          </Button>
        )}
      </>
    )
  }
}

export default NotificationIndicator
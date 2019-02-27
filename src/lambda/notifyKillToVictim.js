/* eslint-disable */
require('dotenv').config()
const axios = require('axios')

//Env variables
const accessKey = process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY
const hgeEndpoint = process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT
const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY

//Query to retrieve the device_token from the victim
const GET_DEVICETOKEN_FROM_VICTIM = `
    query get_devicetoken_from_victim ($player_id: uuid!){
        players(where: {player_id: {_eq: $player_id}}){
        device_token
        }
    }
`

//Query to retrieve the name of the assasin
const GET_ASSASIN_NAME = `
    query get_assasin_name ($player_id: uuid!){
        players(where: {player_id: {_eq: $player_id}}){
        name
        }
    }
`

exports.handler = async function(req) {
  // -- We only care to do anything if this is our POST request.
  if (req.httpMethod !== 'POST' || !req.body) {
    return {
      statusCode: 405,
      headers,
      body: 'Method Not Allowed',
    }
  }

  // -- Parse the body contents into an object.
  const request = JSON.parse(req.body)
  const {
    event: { data },
  } = request

  try {
    //Extract relevant data and obtain the deviceToken
    const { victim_id, assasin_id, kill_id } = data.new
    //Get devide token from victim
    const resGetDeviceToken = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GET_DEVICETOKEN_FROM_VICTIM,
        variables: {
          player_id: victim_id,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    const deviceToken = resGetDeviceToken.data.data.players[0].device_token
    console.log(deviceToken)

    if (!deviceToken) {
      return {
        statusCode: 200,
        body: 'The player does not have notifications activated',
      }
    }

    //Get assasin name
    const resGetAssasinName = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GET_ASSASIN_NAME,
        variables: {
          player_id: assasin_id,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })

    const assasinName = resGetAssasinName.data.data.players[0].name
    console.log(assasinName)

    const payload = {
      to: deviceToken,
      notification: {
        body:
          "El teu assasí t'ha eliminat. Entra a l'aplicació per validar la mort i entregar el clauer.",
        title: 'Estàs mort/a!',
        icon:
          'https://res.cloudinary.com/okstudio/image/upload/v1547740222/icon.png',
        click_action: 'https://www.lapastanagadelrei.cat/',
      },
    }

    //Send notification
    const resSendNotification = await axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${FCM_SERVER_KEY}`,
      },
      data: payload,
    })
    if (resSendNotification.success === 1) {
      return
    }
  } catch (err) {
    console.log(err.toString())
    return {
      statusCode: 500,
      error: JSON.stringify(err),
    }
  }

  console.log('Notification send correctly')
  const responseBody = {
    status: `Notification send correctly to victim`,
  }
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}

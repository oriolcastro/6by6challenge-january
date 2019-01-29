require('dotenv').config()
const axios = require('axios')

// Env variables
const accessKey = process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY
const hgeEndpoint = process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT

// Mutation to generate the Kills
// TODO: Change insert_killdDev for insert_kill for production

const GENERATE_KILLS = `
mutation insert_killsDev($assasin_id: uuid! ,$victim_id: uuid!) {
    insert_killsDev(objects: [{assasin_id: $assasin_id, victim_id: $victim_id}]){
        returning{
            kill_id
        }
    }
}
`

// Mutation to assign the kill to each player
// TODO: Change update_playersDev for update_players in production

const ASSIGN_KILL = `
mutation update_playersDev($player_id: uuid!, $kill_id: Int!) {
    update_playersDev(where: {player_id: {_eq: $player_id}}, _set: {kill_id: $kill_id}) {
      returning {
        player_id
      }
    }
  
`

// Query to get the array of players before or after the set date
// TODO: Change playersDev for players in production

const GET_PLAYERS = `
query playersDev($breaking_date: date!) {
    playersDev(where: {birthday: {_gte: $breaking_date}}) {
      player_id
    }
  }
`

// Main lambda function
exports.handler = async event => {
  // -- We only care to do anything if this is our POST request.
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 405,
      headers,
      body: 'Method Not Allowed',
    }
  }

  // -- Parse the body contents into an object.
  const data = JSON.parse(event.body)
  console.log(`This is the data send to lambda function: ${event.body}`)
  const { breaking_date } = data

  try {
    // Get players
    const resGetPlayers = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GET_PLAYERS,
        variables: {
          breaking_date,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    console.log(resGetPlayers)
    const playersArray = resGetPlayers.data.playersDev
    console.log(playersArray)

    // Loop through the array
  } catch (err) {
    console.log(err)
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'error', error_details: err }),
    }
  }

  const responseBody = {
    status: 'Everything ok',
  }

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}

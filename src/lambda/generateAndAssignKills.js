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
    playersDev(where: {birthday: {_gte: $breaking_date}}, order_by: {player_id: asc}) {
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

  try {
    // Get players
    const resGetPlayers = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GET_PLAYERS,
        variables: {
          breaking_date: data.breaking_date,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })

    const playersArray = resGetPlayers.data.data.playersDev
    console.log(playersArray)

    playersArray.forEach((player, index) => {
        console.log(index)
        if (index+1 < playersArray.length){
            const resGenKill = await axios({
                method: 'post',
                url: hgeEndpoint,
                data: {
                    query: GENERATE_KILLS,
                 variables: {
                       assasin_id: player.player_id,
                      victim_id: playersArray[index+1].player_id,
                 },
              },
             headers: { 'x-hasura-access-key': accessKey },
            })
            const kill_id = resGenKill.data.data.insert_killsDev.returning.kill_id
            console.log(kill_id)
        }
    })

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

/* eslint-disable */
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
            assasin_id
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
        name
      }
    }
  }
`

// Query to get the array of players before or after the set date
// TODO: Change playersDev for players in production

const GET_YOUNG_PLAYERS = `
query playersDev($separationDate: date!) {
    playersDev(where: {birthday: {_gte: $separationDate}}, order_by: {player_id: asc}) {
      player_id
    }
  }
`
const GET_OLD_PLAYERS = `
query playersDev($separationDate: date!) {
    playersDev(where: {birthday: {_lt: $separationDate}}, order_by: {player_id: asc}) {
      player_id
    }
  }
`

// Main lambda function
exports.handler = async function(event) {
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
  const { separationDate, listSelector } = data.payload

  // Create a wrapper function to execute the mutations before moving into the next item in the array
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  try {
    // Get players
    //TODO: See if there is need to generate more than 2 lists.
    let selectedQuery
    if (listSelector === 'young') {
      selectedQuery = GET_YOUNG_PLAYERS
    } else {
      selectedQuery = GET_OLD_PLAYERS
    }
    const resGetPlayers = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: selectedQuery,
        variables: {
          separationDate,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })

    const playersArray = resGetPlayers.data.data.playersDev
    console.log(playersArray)

    // Loop through the players array creating the kills for each one
    asyncForEach(playersArray, async (player, index, array) => {
      const assasinId = player.player_id

      let victimId = ''
      if (index + 1 === array.length) {
        victimId = array[0].player_id
      } else {
        victimId = array[index + 1].player_id
      }

      // Insert kill mutation
      const resInsertKill = await axios({
        method: 'post',
        url: hgeEndpoint,
        data: {
          query: GENERATE_KILLS,
          variables: {
            assasin_id: assasinId,
            victim_id: victimId,
          },
        },
        headers: { 'x-hasura-access-key': accessKey },
      })
      const createdKillId =
        resInsertKill.data.data.insert_killsDev.returning[0].kill_id
      console.log(`Kill generated correctly with the id: ${createdKillId}`)
      //   console.log(
      //     `Will be assigned to player: ${
      //       resInsertKill.data.data.insert_killsDev.returning[0].assasin_id
      //     }`
      //   )

      const resAssignKill = await axios({
        method: 'post',
        url: hgeEndpoint,
        data: {
          query: ASSIGN_KILL,
          variables: {
            player_id: array[index].player_id,
            kill_id: createdKillId,
          },
        },
        headers: { 'x-hasura-access-key': accessKey },
      })
      console.log(
        `Kill number ${createdKillId} has been assigned to ${
          resAssignKill.data.data.update_playersDev.returning[0].name
        }`
      )
    })
  } catch (err) {
    console.log(err.response.data)
    return {
      statusCode: 500,
      error: JSON.stringify(err.response.data),
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

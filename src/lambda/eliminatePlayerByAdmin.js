/* eslint-disable */
import { Query } from 'react-apollo'
require('dotenv').config()
const axios = require('axios')

// Env variables
const accessKey = process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY
const hgeEndpoint = process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT

//TODO: Eliminate the DEV
const GET_MY_ASSASIN = `
query searchWhoKillsMe($me: uuid!) {
    killsDev(where: {_and: [{victim_id: {_eq: $me}}, {status: {_eq: "live"}}]}) {
      kill_id
      assasin{
        player_id
        name
      }
    }
  }
`

//TODO: Eliminate the DEV
const GET_MY_VICTIM = `
query getMyVictim($me: uuid!) {
    killsDev(where: {_and: [{assasin_id: {_eq: $me}}, {status: {_eq: "live"}}]}) {
        kill_id
        victim {
          player_id
          name
        }
      }
  }
`

//TODO: Eliminate the DEV
const GENERATE_NEW_KILL = `
mutation insert_killsDev($assasin_id: uuid!, $victim_id: uuid!) {
    insert_killsDev(objects: [{assasin_id: $assasin_id, victim_id: $victim_id}]){
        returning{
            kill_id
        }
    }
}
`

//TODO: Eliminate the DEV
const CLEAR_KILLS_STATUS = `
mutation clearKillsStatus($killToClearAsAssasin: Int!, $killToClearAsVictim: Int!) {
    update_killsDev(where: {_or: [{kill_id: {_eq: $killToClearAsAssasin}}, {kill_id: {_eq: $killToClearAsVictim}}]}, _set: {status: "clear", edited: "now()"}) {
      affected_rows
    }
  }
`

//TODO: Eliminate the DEV
const ASSIGN_KILL = `
mutation update_playersDev($player_id: uuid!, $kill_id: Int!) {
    update_playersDev(where: {player_id: {_eq: $player_id}}, _set: {kill_id: $kill_id}) {
      affected_rows
    }
  }
`

//TODO: Eliminate the DEV
const MARK_AS_DEAD = `
mutation update_playersDev($player_id: uuid!) {
    update_playersDev(where: {player_id: {_eq: $player_id}}, _set: {isDead: true}) {
      affected_rows
    }
  }
`

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
  const playerToEliminate = data.payload.player_id

  try {
    //Query to obtain the victim of the PlayerToEliminate
    const resGetMyVictimQuery = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GET_MY_VICTIM,
        variables: {
          me: playerToEliminate,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    //TODO: Eliminate the DEV
    const newVictimId =
      resGetMyVictimQuery.data.data.killsDev[0].victim.player_id
    console.log(`This is the ID of the victim for player X: ${newVictimId}`)
    const killToClearAsAssasin =
      resGetMyVictimQuery.data.data.killsDev[0].kill_id
    console.log(
      `This is the ID of the kill to clear where player X was the assasin: ${killToClearAsAssasin}`
    )

    //Query to obtain the assasin of the PlayerToEliminate
    const resGetMyAssasinQuery = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GET_MY_ASSASIN,
        variables: {
          me: playerToEliminate,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    //TODO: Eliminate the DEV
    const newAssasinId =
      resGetMyAssasinQuery.data.data.killsDev[0].assasin.player_id
    console.log(`This is the ID of the assasin of player X: ${newAssasinId}`)
    const killToClearAsVictim =
      resGetMyAssasinQuery.data.data.killsDev[0].kill_id
    console.log(
      `This is the ID of the kill to clear where player X was the victim: ${killToClearAsVictim}`
    )

    //Mutation to create a new KILL where Assasin is newAssasinId and Victim newVictimId
    const resGenerateNewKillMutation = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GENERATE_NEW_KILL,
        variables: {
          assasin_id: newAssasinId,
          victim_id: newVictimId,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    //TODO: Eliminate the DEV
    const newlyCreatedKillId =
      resGenerateNewKillMutation.data.data.insert_killsDev.returning[0].kill_id
    console.log(
      `This is the ID of the newly created kill: ${newlyCreatedKillId}`
    )

    //Clear status from old KILL corresponding to playertoeliminate and newAssasin to "clear"
    const resClearKillsStatus = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: CLEAR_KILLS_STATUS,
        variables: {
          killToClearAsAssasin: killToClearAsAssasin,
          killToClearAsVictim: killToClearAsVictim,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    console.log(
      `The ${
        resClearKillsStatus.data.data.update_killsDev.affected_rows
      } kills status has been changed to "clear"`
    )

    //Assign new Kill_id to the newAssasin player
    await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: ASSIGN_KILL,
        variables: {
          player_id: newAssasinId,
          kill_id: newlyCreatedKillId,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    console.log(
      `The newly created kill has been assigned to the player who previously killed player X`
    )

    //Mark eliminated player as dead
    await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: MARK_AS_DEAD,
        variables: {
          player_id: playerToEliminate,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    console.log(`The player X has been marked as dead`)
  } catch (err) {
    console.log(err.response.data)
    return {
      statusCode: 500,
      error: JSON.stringify(err),
    }
  }
  const responseBody = {
    status:
      'Player have been eliminated from the game and the kill has been traspased to its assasin',
  }

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}

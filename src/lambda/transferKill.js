/* eslint-disable */
require('dotenv').config()
const axios = require('axios')

// Env variables
const accessKey = process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY
const hgeEndpoint = process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT

//Query to get id from new victim
//TODO: remove DEV in production
const GET_VICTIM_FROM_KILLEDPLAYER = `
    query get_victim_from_killedplayer($victim_id: uuid!) {
        killsDev(where: {_and: [{assasin_id: {_eq: $victim_id}}, {status: {_eq: "live"}}]}) {
            victim_id
            kill_id
          }
    }
`

// Mutation to generate the Kills
//TODO: remove DEV in production
const GENERATE_NEW_KILL = `
    mutation generate_new_kill($assasin_id: uuid! ,$victim_id: uuid!) {
        insert_killsDev(objects: [{assasin_id: $assasin_id, victim_id: $victim_id}]){
            returning{
                kill_id
                assasin_id
            }
        }
    }
`

// Mutation to assign the new kill to the Assasin player
//TODO: remove DEV in production
const ASSIGN_KILL = `
mutation assign_kill($player_id: uuid!, $kill_id: Int!) {
    update_playersDev(where: {player_id: {_eq: $player_id}}, _set: {kill_id: $kill_id}) {
      returning {
        player_id
        name
      }
    }
  }
`

//Mutation to update the status of the old Kill from assasin
//TODO: remove DEV on production
const UPDATE_KILL_FROM_ASSASIN = `
    mutation update_Kill_from_assasin($kill_id: Int!){
        update_killsDev(where: {kill_id: {_eq: $kill_id}}, _set: {status: "fulfilled", edited: "now()"}){
            affected_rows
        }
    }
`

//Mutation to update the status of the old Kill from victim
//TODO: remove DEV on production
const UPDATE_KILL_FROM_VICTIM = `
    mutation update_kill_from_victim($kill_id: Int!){
        update_killsDev(where: {kill_id: {_eq: $kill_id}}, _set: {status: "clear", edited: "now()"}){
            affected_rows
        }
    }
`

//Mutation to update the killed player and remove it from the game
//TODO: remove DEV on production
const MARK_AS_DEAD = `
    mutation mark_as_dead($player_id: uuid!) {
        update_playersDev(where: {player_id: {_eq: $player_id}}, _set: {isDead: true}) {
            affected_rows
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
  console.log(req)
  // -- Parse the body contents into an object.
  const request = JSON.parse(req.body)
  console.log('This is the body from request')
  console.log(request)
  const {
    event: { data },
  } = request
  console.log('This is the data send to function')
  console.log(data)

  try {
    const {
      victim_id: victimPlayer,
      assasin_id: assasinPlayer,
      kill_id: killFromAssasin,
    } = data.new

    //Get victim_id from victimPlayer
    const resGetVictimFromKilledPlayer = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GET_VICTIM_FROM_KILLEDPLAYER,
        variables: {
          player_id: victimPlayer,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    //TODO: Update killsDev to players in production
    const {
      victim_id: newVictim,
      kill_id: killFromVictim,
    } = resGetVictimFromKilledPlayer.data.data.killsDev[0]
    console.log('This is the data from the victim', newVictim, killFromVictim)

    //Generate newKill between assasinPlayer and victim_id
    const resGenerateNewKill = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: GENERATE_NEW_KILL,
        variables: {
          assasin_id: assasinPlayer,
          victim_id: newVictim,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    //TODO: Update killsDev to players in production
    const {
      kill_id: newKill,
    } = resGenerateNewKill.data.data.insert_killsDev.returning[0]
    console.log('This is the data from the victim', newKill)

    //Assign newKill to assasinPlayer
    await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: ASSIGN_KILL,
        variables: {
          player_id: assasinPlayer,
          kill_id: newKill,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    console.log('The new killl has been assigmed to the assasin player')

    //Update killFromAssasin and killFromVictim status
    await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: UPDATE_KILL_FROM_ASSASIN,
        variables: {
          kill_id: killFromAssasin,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })

    await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: UPDATE_KILL_FROM_VICTIM,
        variables: {
          kill_id: killFromVictim,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    console.log(
      'The kills status from assasin and victim have been updates to fulfilled and clear'
    )

    //Update victimPlayer status
    await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: MARK_AS_DEAD,
        variables: {
          player_id: victimPlayer,
        },
      },
    })
    console.log('The killed player have been marked as dead')
  } catch (err) {
    console.log('There have been an error with the axios calls')
    console.log(err)
    return {
      statusCode: 500,
      error: err,
    }
  }

  console.log('Player eliminated and kill data transfered')
  const responseBody = {
    status: `Player eliminated and kill data transfered`,
  }
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}

/* eslint-disable */
require('dotenv').config()
const axios = require('axios')

//Env variables
const accessKey = process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY
const hgeEndpoint = process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT
const auth0Domain = process.env.AUTH0_DOMAIN
const auth0ClientId = process.env.AUTH0_CLIENT_ID

//Query for the mutation that adds the new player to its team.
const ASSIGN_TEAM = `
  mutation update_teams($name: String!) {
    update_teams(where: { name: { _eq: $name } }, _inc: { num_players: 1 }) {
      returning {
        team_id
      }
    }
  }
`
//Query for the mutation that adds the new player.
const CREATE_PLAYER = `
mutation insert_players($name: String!, $firstSurname: String!, $secondSurname: String!, $mobile: String!, $email: String!, $birthday: date!, $team_id: Int!) {
  insert_players(objects: [{name: $name, firstSurname: $firstSurname, secondSurname: $secondSurname, mobile: $mobile, email: $email, birthday: $birthday, team_id: $team_id}]) {
    returning {
      player_id
    }
  }
}
`
//Main lambda function
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
  const {
    name,
    firstSurname,
    secondSurname,
    mobile,
    email,
    birthday,
    team,
    password,
  } = data.payload

  let player_id

  try {
    //Assign team mutation
    const resAssignTeam = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: ASSIGN_TEAM,
        variables: {
          name: team,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    const team_id = resAssignTeam.data.data.update_teams.returning[0].team_id
    console.log(`Player added to the team number: ${team_id}`)

    //Create user mutation
    const resAddPlayer = await axios({
      method: 'post',
      url: hgeEndpoint,
      data: {
        query: CREATE_PLAYER,
        variables: {
          name: name,
          firstSurname: firstSurname,
          secondSurname: secondSurname,
          mobile: mobile,
          email: email,
          birthday: birthday,
          team_id: team_id,
        },
      },
      headers: { 'x-hasura-access-key': accessKey },
    })
    player_id = resAddPlayer.data.data.insert_players.returning[0].player_id
    console.log(`Player created with the id: ${player_id}`)

    //Signup user to Auth0
    const resAuth0 = await axios({
      method: 'post',
      url: 'https://' + auth0Domain + '/dbconnections/signup',
      data: {
        client_id: auth0ClientId,
        email: email,
        password: password,
        user_metadata: { name: name },
        connection: 'Username-Password-Authentication',
      },
    })

    console.log('User created in Auth0')
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    }
  }
  const responseBody = {
    status: 'User created',
    player_id: player_id,
  }

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}

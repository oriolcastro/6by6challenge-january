import { gql } from 'apollo-boost'

export const GET_TEAMS = gql`
  query get_teams {
    teams(order_by: { team_id: asc }) {
      team_id
      name
      num_players
    }
  }
`
// TODO: Before merging with Master branch change from 'playersDev' to 'players'
export const GET_PLAYERS = gql`
  query get_players {
    playersDev(where: { isDead: { _eq: false } }) {
      player_id
      name
      firstSurname
      secondSurname
      email
      mobile
      kill_id
      team {
        name
      }
    }
  }
`
// TODO: Before merging with Master branch change from 'killsDev' to 'kills'
export const GET_VICTIM_ID = gql`
  query get_victim_id {
    killsDev(where: { status: { _eq: "live" } }) {
      victim_id
    }
  }
`

// TODO: Before merging with Master branch change from 'playersDev' to 'players'
export const GET_VICTIM_DATA = gql`
  query get_victim_data($VictimId: uuid!) {
    playersDev(where: { player_id: { _eq: $VictimId } }) {
      name
      firstSurname
      secondSurname
      team {
        name
      }
    }
  }
`
// TODO: Before merging with Master branch change from 'killsDev' to 'kills'
export const VALIDATE_MY_KILL = gql`
  mutation validate_my_kill {
    update_killsDev(
      where: { status: { _eq: "live" } }
      _set: { hasAssasinValidated: true }
    ) {
      returning {
        kill_id
      }
    }
  }
`

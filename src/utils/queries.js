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
export const GET_MY_CURRENT_VICTIM = gql`
  query get_my_current_victim($player_id: uuid!) {
    killsDev(
      where: {
        _and: [
          { status: { _eq: "live" } }
          { assasin: { player_id: { _eq: $player_id } } }
        ]
      }
    ) {
      hasAssasinValidated
      victim {
        player_id
        name
        firstSurname
        secondSurname
        team {
          name
        }
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

// TODO: Before merging with Master branch change from 'killsDev' to 'kills'
export const GET_MY_KILLED_VICTIMS = gql`
  query get_my_victims($player_id: uuid!) {
    killsDev(
      where: {
        _and: [
          { status: { _eq: "fulfilled" } }
          { assasin: { player_id: { _eq: $player_id } } }
        ]
      }
      order_by: { edited: desc }
    ) {
      victim {
        player_id
        name
        firstSurname
        secondSurname
        team {
          name
        }
      }
    }
  }
`

export const GET_LAST_VICTIMS = gql`
  query get_last_victims {
    killsDev(
      where: { status: { _eq: "fulfilled" } }
      order_by: { edited: desc }
      limit: 10
    ) {
      victim {
        player_id
        name
        firstSurname
        secondSurname
        team {
          name
        }
      }
    }
  }
`

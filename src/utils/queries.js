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

export const GET_PLAYERS = gql`
  query get_players {
    players(where: { isDead: { _eq: false } }) {
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
        _and: [{ status: { _eq: "live" } }, { assasin_id: { _eq: $player_id } }]
      }
    ) {
      kill_id
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

export const GET_MY_STATUS = gql`
  query get_my_status($player_id: uuid!) {
    killsDev(
      where: {
        _and: [
          { victim_id: { _eq: $player_id } }
          { status: { _eq: "live" } }
          { hasAssasinValidated: { _eq: true } }
        ]
      }
    ) {
      kill_id
      hasAssasinValidated
      assasin {
        name
      }
    }
  }
`

// TODO: Before merging with Master branch change from 'killsDev' to 'kills'
export const VALIDATE_MY_KILL = gql`
  mutation validate_my_kill($kill_id: Int!) {
    update_killsDev(
      where: { kill_id: { _eq: $kill_id } }
      _set: { hasAssasinValidated: true }
    ) {
      affected_rows
    }
  }
`
// TODO: Before merging with Master branch change from 'killsDev' to 'kills'
export const VALIDATE_MY_DEATH = gql`
  mutation validatemykill($kill_id: Int!) {
    update_killsDev(
      where: { kill_id: { _eq: $kill_id } }
      _set: { hasVictimValidated: true }
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

export const GET_LAST_AGGREGATE_VICTIMS_TOTAL = gql`
  query get_last_aggregate_victims {
    killsDev_aggregate(where: { status: { _eq: "fulfilled" } }) {
      aggregate {
        count
      }
    }
  }
`

export const GET_LAST_AGGREGATE_VICTIMS_TODAY = gql`
  query get_last_aggregate_victims_today(
    $endToday: timestamptz!
    $startToday: timestamptz!
  ) {
    killsDev_aggregate(
      where: {
        _and: [
          { status: { _eq: "fulfilled" } }
          { edited: { _gt: $startToday } }
          { edited: { _lte: $endToday } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`
export const ADD_DEVICE_TOKEN = `
  mutation add_device_token($device_token: String!, $player_id: uuid!) {
    update_playersDev(where: {player_id: {_eq: $player_id}}, _set: {device_token: $device_token}){
      returning{
        device_token
      }
    }
  }
`

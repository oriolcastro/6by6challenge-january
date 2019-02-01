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
    }
  }
`

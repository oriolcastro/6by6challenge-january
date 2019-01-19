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

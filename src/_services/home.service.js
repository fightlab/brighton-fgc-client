import { gql } from 'apollo-boost'
import { gqlClient as client } from '../_constants'

export class HomeService {
  static statistics () {
    return client
      .query({
        query: gql`
          {
            events: eventsCount
            tournaments: tournamentsCount
            matches: matchesCount
            players: playersCount
          }
        `
      })
  }
}

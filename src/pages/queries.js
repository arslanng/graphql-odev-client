import { gql } from "@apollo/client";

const eventFragment = gql`
  fragment EventFragment on Event {
    id
    title
    desc
    date
  }
`;

export const GET_EVENTS = gql`
  query Query {
    events {
      ...EventFragment
    }
  }
  ${eventFragment}
`;

export const EVENTS_ALL_SUBSCRIPTION = gql`
  subscription {
    eventsAll {
      ...EventFragment
    }
  }
  ${eventFragment}
`;

export const GET_EVENT_DETAIL = gql`
  query Query($eventId: ID!) {
    event(id: $eventId) {
      id
      title
      desc
      date
      user {
        id
        username
      }
      location {
        id
        name
        desc
      }
      participants {
        user_id
        username
      }
    }
  }
`;

export const EVENT_PARTICIPANT = gql`
  subscription Subscription($eventId: ID) {
    participantAdded(event_id: $eventId) {
      user_id
      username
    }
  }
`;

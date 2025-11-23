import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $name: String, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      id
      email
      name
      role
    }
  }
`;

export const BOOK_TICKET = gql`
  mutation BookTicket($userId: ID, $email: String, $showId: ID!, $seatIds: [ID!]!) {
    bookTicket(userId: $userId, email: $email, showId: $showId, seatIds: $seatIds) {
      id
      totalAmount
      status
      seats {
        id
        row
        number
      }
    }
  }
`;

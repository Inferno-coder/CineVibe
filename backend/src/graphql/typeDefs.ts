import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
    bookings: [Booking!]!
  }

  type Movie {
    id: ID!
    title: String!
    description: String
    duration: Int!
    genre: String!
    releaseDate: String!
    posterUrl: String
    shows: [Show!]!
  }

  type Theater {
    id: ID!
    name: String!
    location: String!
    screens: [Screen!]!
  }

  type Screen {
    id: ID!
    number: Int!
    theater: Theater!
    seats: [Seat!]!
    shows: [Show!]!
  }

  type Seat {
    id: ID!
    row: String!
    number: Int!
    type: SeatType!
    screen: Screen!
    isBooked(showId: ID!): Boolean!
  }

  type Show {
    id: ID!
    startTime: String!
    movie: Movie!
    screen: Screen!
    bookings: [Booking!]!
  }

  type Booking {
    id: ID!
    user: User!
    show: Show!
    seats: [Seat!]!
    totalAmount: Float!
    status: BookingStatus!
    createdAt: String!
  }

  enum Role {
    USER
    ADMIN
  }

  enum SeatType {
    STANDARD
    PREMIUM
    VIP
  }

  enum BookingStatus {
    PENDING
    CONFIRMED
    CANCELLED
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    movies: [Movie!]!
    movie(id: ID!): Movie
    theaters: [Theater!]!
    theater(id: ID!): Theater
    show(id: ID!): Show
  }

  type Mutation {
    createUser(email: String!, name: String, password: String!): User!
    createMovie(title: String!, duration: Int!, genre: String!, releaseDate: String!): Movie!
    createTheater(name: String!, location: String!): Theater!
    createShow(movieId: ID!, screenId: ID!, startTime: String!): Show!
    bookTicket(userId: ID, email: String, showId: ID!, seatIds: [ID!]!): Booking!
  }
`;

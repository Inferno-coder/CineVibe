import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      description
      duration
      genre
      releaseDate
      posterUrl
    }
  }
`;

export const GET_MOVIE_DETAILS = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      description
      duration
      genre
      releaseDate
      posterUrl
      shows {
        id
        startTime
        screen {
          id
          number
          theater {
            name
            location
          }
        }
      }
    }
  }
`;

export const GET_THEATERS = gql`
  query GetTheaters {
    theaters {
      id
      name
      location
      screens {
        id
        number
        shows {
          id
          startTime
          movie {
            id
            title
            genre
            duration
            posterUrl
          }
        }
      }
    }
  }
`;


export const GET_SHOW = gql`
  query GetShow($id: ID!) {
    show(id: $id) {
      id
      startTime
      screen {
        id
        seats {
          id
          row
          number
          isBooked(showId: $id)
        }
      }
      movie {
        id
        title
        posterUrl
      }
    }
  }
`;

export const GET_USER_BOOKINGS = gql`
  query GetUserBookings($email: String!) {
    userByEmail(email: $email) {
      id
      bookings {
        id
        totalAmount
        status
        createdAt
        show {
          startTime
          movie {
            title
            posterUrl
            duration
          }
          screen {
            number
            theater {
              name
              location
            }
          }
        }
        seats {
          row
          number
          type
        }
      }
    }
  }
`;

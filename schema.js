const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Passenger {
    _id: String!
    first_name: String!
    last_name: String!
    email: String!
    contact: String!
  }

  type Airport {
    name: String!
    city: String
    Country: String
  }

  type Flight_detail {
    _id: String!
    flight_number: String
    departure_airport_id: String
    arrival_airport_id: String
    departure_time: String
    arrival_time: String
    capacity: String
  }

  type Book_flight {
    _id: String!
    flight_id: String!
    passenger_id: String!
    booking_date: String
    seat_no: [String]
    status: String
    passengers: [Passenger]
    flights: Flight_detail
  }

  type Query {
    passengers: [Passenger]
    airports: [Airport]
    flights: [Flight_detail]
    flight(_id: String!): Flight_detail
    booked_flights: [Book_flight]
  }

  type Mutation {
    bookFlight(
      flight_id: String!
      passenger_id: String!
      seat_no: [String!]
    ): Book_flight
    add_passenger(passenger: addPassengerInput!): Passenger
    cancel_flight(flight_id: String!, passenger_id: String!): [Book_flight]
  }

  input addPassengerInput {
    first_name: String!
    last_name: String!
    email: String!
    contact: String!
  }
`;

module.exports = typeDefs;

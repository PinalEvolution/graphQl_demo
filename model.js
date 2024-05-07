const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passengerSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
  },
  { collection: "Passenger" }
);

const Passenger = mongoose.model("Passenger", passengerSchema);

const flightSchema = new Schema(
  {
    flight_number: {
      type: String,
      required: true,
    },
    departure_airport_id: {
      type: String,
      required: true,
    },
    arrival_airport_id: {
      type: String,
      required: true,
    },
    departure_time: {
      type: String,
      required: true,
    },
    arrival_time: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
  },
  { collection: "Flight_detail" }
);
const Flight_detail = mongoose.model("Flight_detail", flightSchema);
const bookFlightSchema = new Schema(
  {
    flight_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Flight_detail",
    },
    passenger_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Passenger",
    },
    booking_date: {
      type: Date,
    },
    seat_no: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
    },
  },
  { collection: "Book_flight" }
);

const Book_flight = mongoose.model("Book_flight", bookFlightSchema);
module.exports = { Passenger, Flight_detail, Book_flight };

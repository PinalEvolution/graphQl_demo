const models = require("./model.js");

const resolvers = {
  Query: {
    passengers: async () => {
      return await models.Passenger.find();
    },
    flights: async () => {
      return await models.Flight_detail.find();
    },
    flight: async (_, args) => {
      const result = await models.Flight_detail.findById(args._id);
      return result;
    },
    booked_flights: async () => {
      // return await models.Book_flight.find();
      try {
        const flights = await models.Book_flight.find().populate("flight_id");
        // .exec();
        //         return (await transaction.populate('items').execPopulate()).items;
        // }
        console.log(flights);
        return flights;
      } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
      }
    },
  },
  Mutation: {
    bookFlight: async (_, { flight_id, passenger_id, seat_no }) => {
      try {
        // Check if flight exists
        const flight = await models.Flight_detail.findById(flight_id);
        if (!flight) {
          throw new Error(`flight not found"`);
        }

        // Check if passenger exists
        const passenger = await models.Passenger.findById(passenger_id);
        if (!passenger) {
          throw new Error(`passenger not found`);
        }

        // Check if seat is available
        let result = await models.Flight_detail.findById(flight_id);
        let capacity = result.capacity;

        const todayStart = new Date();
        todayStart.setUTCHours(0, 0, 0, 0); // Set UTC hours, minutes, seconds, and milliseconds to 0 to get the start of today

        const todayEnd = new Date(todayStart);
        todayEnd.setUTCHours(23, 59, 59, 999); // Set UTC hours, minutes, seconds, and milliseconds to the end of today

        let seat_result = await models.Book_flight.find({
          status: "confirmed",
          booking_date: {
            $gte: todayStart, // Greater than or equal to the start of today in UTC
            $lte: todayEnd, // Less than or equal to the end of today in UTC
          },
        });

        let no_of_seat = 0;
        for (let i = 0; i < seat_result.length; i++) {
          no_of_seat += seat_result[i].seat_no.length;
        }

        let available_seat = parseInt(capacity.trim()) - no_of_seat;
        console.log(available_seat);

        //if available seat book seat
        if (available_seat > 0) {
          // Create a new flight booking
          const booking = new models.Book_flight({
            flight_id: flight_id,
            passenger_id: passenger_id,
            booking_date: new Date().toISOString(),
            seat_no: seat_no,
            status: "confirmed", // You can set initial status as confirmed or pending
          });

          // Save the booking
          await booking.save();

          return booking;
        } else {
          throw new Error(`not available seat`);
        }
      } catch (error) {
        throw new Error(`Failed to book flight: ${error.message}`);
      }
    },
    add_passenger: async (_, passenger) => {
      console.log(passenger.passenger);
      const passengers = new models.Passenger(passenger.passenger);
      await passengers.save();
      return passengers;
    },
    cancel_flight: async (_, { flight_id, passenger_id }) => {
      result = await models.Book_flight.find({
        flight_id: flight_id,
        passenger_id: passenger_id,
      });
      console.log(result);
      if (result.length > 0) {
        const flight = await models.Book_flight.findByIdAndUpdate(
          result[0]._id,
          { status: "canceled" }
        );
        console.log(flight);
      }
      return await models.Book_flight.find();
    },
  },
  Book_flight: {
    passengers: async (parent, _, { models }) => {
      try {
        // Fetch passengers corresponding to the passenger IDs in the parent object
        const passengers = await models.Passenger.find({
          _id: { $in: parent.passenger_id },
        });
        return passengers;
      } catch (error) {
        console.error("Error fetching passengers:", error);
        return []; // Return an empty array in case of error
      }
    },
    flights: async (parent, _, { models }) => {
      try {
        // Fetch flights corresponding to the flight IDs in the parent object
        const flights = await models.Flight_detail.find({
          _id: { $in: parent.flight_id },
        });
        return flights;
      } catch (error) {
        console.error("Error fetching flights:", error);
        return []; // Return an empty array in case of error
      }
    },
  },
};

module.exports = resolvers;

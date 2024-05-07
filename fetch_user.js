const mongoose = require("mongoose");

async function call() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Flights", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to MongoDB");

    const passengerSchema = new mongoose.Schema(
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

    // Debugging: Log the executed query
    console.log("Executing query...");

    // Find documents
    let result = await Passenger.find();

    // Debugging: Log the result of the query
    console.log("Found documents:", result);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    mongoose.disconnect();
  }
}

call();

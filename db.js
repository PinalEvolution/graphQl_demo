const mongoose = require("mongoose");

// const uri = "mongodb://localhost:27017/Flights";

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log(`Database connected: ${uri}`);
//   })
//   .catch((err) => {
//     console.error(`Connection error: ${err}`);
//   });
// const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Flights", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToDatabase;

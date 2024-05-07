// const { MongoClient } = require("mongodb");
// const mongoose = require("mongoose");
// var express = require("express");
// var { createHandler } = require("graphql-http/lib/use/express");
// var { buildSchema } = require("graphql");
// var { ruruHTML } = require("ruru/server");

// const uri = "mongodb://localhost:27017/Flights";

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log(`Database connected: ${uri}`);
//   })
//   .catch((err) => {
//     console.error(`Connection error: ${err}`);
//   });
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
// // The root provides a resolver function for each API endpoint
// var root = {
//   hello() {
//     return "Hello world!";
//   },
// };

// var app = express();

// // Create and use the GraphQL handler.
// app.all(
//   "/graphql",
//   createHandler({
//     schema: schema,
//     rootValue: root,
//   })
// );

// // Serve the GraphiQL IDE.
// app.get("/", (_req, res) => {
//   res.type("html");
//   res.end(ruruHTML({ endpoint: "/graphql" }));
// });

// // Start the server at port
// app.listen(4000);
// console.log("Running a GraphQL API server at http://localhost:4000/graphql");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const connectToDatabase = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolver");

async function startServer() {
  //  // Connect to the database
  await connectToDatabase();

  // Create an Express app
  const app = express();

  // Create an Apollo server
  const server = new ApolloServer({
    typeDefs /* GraphQL schema */,
    resolvers /* GraphQL resolvers */,
  });
  await server.start();
  // Apply the Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();

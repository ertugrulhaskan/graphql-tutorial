const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/schema");

const mongoose = require("mongoose");

const app = express();

// var uri =
//   "mongodb+srv://<username>:<password>@gql-ninja.4pimx.mongodb.net/<dbname>?retryWrites=true&w=majority";

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log(err));

mongoose.connect("mongodb://localhost:27017/TheDB",{
    useNewUrlParser: true ,
    useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4200, () => console.info("Now listening for requests on port 4200"));

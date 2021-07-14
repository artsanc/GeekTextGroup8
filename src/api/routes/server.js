var express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { Client } = require("pg");
<<<<<<< HEAD
const pw = "Backend35";
const connectionString =
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";
=======
const pw = "6100325";
var indexRouter = require("./src/api/routes/index");
>>>>>>> 14f1cc7103abe5217d8a8bc6dfd828e997bb84b0

app.use(express.json());
app.use("/", indexRouter);
// const connectionString =
//   "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

// const client = new Client({
//   connectionString: connectionString
// });

// client.connect();

app.listen(port);

console.log("Server is running on port: " + port);

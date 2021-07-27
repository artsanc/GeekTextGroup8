var express = require("express");
const bodyParser = require("body-parser")
const app = express();
const port = process.env.PORT || 3000;
const { Client } = require("pg");
const pw = "6100325";
var indexRouter = require("./src/api/routes/index");

app.use(express.json());
app.use("/", indexRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const connectionString =
//   "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

// const client = new Client({
//   connectionString: connectionString
// });

// client.connect();

app.listen(port);

console.log("Server is running on port: " + port);
var express = require("express");
const app = express();
const port = process.env.PORT || 3000;
 const { Client } = require("pg");
const pw = "0105.Eenajved";
 var indexRouter = require("./src/api/routes/index");

 app.use(express.json());
app.use("/", indexRouter);
const connectionString =
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

 const client = new Client({
   connectionString: connectionString
 });

 client.connect();

app.listen(port);

console.log("Server is running on port: " + port);
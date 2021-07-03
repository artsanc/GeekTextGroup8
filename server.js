var express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { Client } = require("pg");
const pw = "polk640320";
const connectionString =
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

const client = new Client({
  connectionString: connectionString
});

client.connect();

app.listen(port);

app.get("/", function(req, res) {
  client.query("SELECT * FROM Employee where id = $1", [1], function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

console.log("Server is running on port: " + port);

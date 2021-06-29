var express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port);

app.get("/", function(req, res) {
  //test
  console.log("in here");
  res.send("hello");
});

console.log("Server is running on port: " + port);

var express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var indexRouter = require("./src/api/routes/index");

app.use(express.json());
app.use("/", indexRouter);

app.listen(port);

console.log("Server is running on port: " + port);

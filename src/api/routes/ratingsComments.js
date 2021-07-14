const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("hola!");
  res.send("in ratings and comments");
});

module.exports = router;

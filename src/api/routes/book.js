const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("hola!");
  res.send("in book");
});

module.exports = router;
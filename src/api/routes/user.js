const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("hola!");
  res.send("in user");
});

module.exports = router;

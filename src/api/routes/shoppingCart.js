const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const pw = "Backend35";

const connectionString =
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

const client = new Client({
  connectionString: connectionString
});
client.connect();

router.get("/", async (req, res) => {
  console.log("hola!");
  res.send("in cart");
});

//Retrieve Endpoint to get the list of books in the shopping cart
router.post("/getCart", async (req, res) => {
  console.log(req.body);
  client.query(
    "SELECT isbn FROM shopping_cart where user_id = " + req.body.user_id,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    }
  );
});

//create a shopping cart and persist a book to the database
router.post("/", async (req, res) => {
  console.log(req.body.user_id);
  console.log(req.body.isbn);
  console.log(
    "INSERT into shopping_cart (user_id, isbn) VALUES (" +
      req.body.user_id +
      ", " +
      req.body.isbn +
      ")"
  );
  client.query(
    "INSERT into shopping_cart (user_id, isbn) VALUES (" +
      req.body.user_id +
      ", " +
      req.body.isbn +
      ")",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.detail);
      } else {
        res.status(200).send("Successfully Created A Shopping Cart");
      }
    }
  );
});

module.exports = router;

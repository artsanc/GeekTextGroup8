const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const pw = "6100325";

const connectionString =
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

const client = new Client({
  connectionString: connectionString
});
client.connect().then(() => {
  console.log("i am connected to db");
});

function uuidv4() {
  //bad uuid function need to switch uuid to include text
  return new Date()
    .getTime()
    .toString()
    .substring(0, 10);
}

function getTimestamp() {
  return new Date();
}

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

//creates a shopping cart for a user via user_id
router.post("/", async (req, res) => {
  let uid = uuidv4();
  console.log(req.body);

  client.query(
    "INSERT into shopping_cart (cart_id,cart_date,user_id) VALUES ('" +
      uid +
      "', '" +
      req.body.cart_date +
      "', " +
      req.body.user_id +
      ")",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send("Successfully created a Cart for User");
    }
  );
});

//adds a book to a shopping cart via cart_id
router.post("/add", async (req, res) => {
  let uid = uuidv4();
  console.log(req.body.cart_id);
  console.log(req.body.isbn);

  client.query(
    "INSERT into shopping_cart_items (cart_id, isbn) VALUES (" +
      uid +
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

// router.delete("/", async(req,res)=>{
//   client.query("")
// })

module.exports = router;

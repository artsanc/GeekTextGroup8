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

//Retrieve Endpoint to get the list of books in the shopping cart
router.post("/getCart", (req, res) => {
  client.query(
    "SELECT shopping_cart.cart_id , books.isbn, books.title, books.description, books.price, books.genre, books.year_published, books.copies_sold, authors.f_name, authors.l_name, authors.publisher FROM shopping_cart INNER JOIN shopping_cart_items ON (shopping_cart.cart_id = shopping_cart_items.cart_id) INNER JOIN books ON (shopping_cart_items.isbn = books.isbn) INNER JOIN authors ON (books.author_id = authors.author_id) where user_id = " +
      req.body.user_id +
      " and shopping_cart.cart_id = " +
      req.body.cart_id,
    function(err, result) {
      if (err) {
        console.log("in here hi");
        console.log(err);
        res.status(400).send(err.detail);
      } else {
        if (result.rowCount == 0) {
          let temp =
            "Bad Request for user_id = " +
            req.body.user_id +
            " and cart_id = " +
            req.body.cart_id;
          res.status(400).send(temp);
        } else {
          res.status(200).send(result.rows);
        }
      }
    }
  );
});

//creates a shopping cart for a user via user_id
router.post("/", (req, res) => {
  console.log(req.body);

  client.query(
    "INSERT into shopping_cart (cart_id,cart_date,user_id) VALUES (" +
      req.body.cart_id +
      ", " +
      req.body.cart_date +
      ", " +
      req.body.user_id +
      ")",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.detail);
      } else {
        res.status(200).send("Successfully created a Cart for User");
      }
    }
  );
});

//adds a book to a shopping cart via cart_id
router.post("/add", (req, res) => {
  console.log(req.body.cart_id);
  console.log(req.body.isbn);

  client.query(
    "INSERT into shopping_cart_items (cart_id, isbn) VALUES (" +
      req.body.cart_id +
      ", " +
      req.body.isbn +
      ")",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.detail);
      } else {
        res.status(200).send("Successfully Added a Book to Shopping Cart");
      }
    }
  );
});

router.delete("/", (req, res) => {
  console.log("the body,", req.body);
  client.query(
    "DELETE from shopping_cart_items where isbn = " +
      req.body.isbn +
      "" +
      " and cart_id = " +
      req.body.cart_id,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.detail);
      } else {
        if (result.rowCount == 0) {
          let temp =
            "Book with isbn : " +
            req.body.isbn +
            " does not exist in cart " +
            req.body.cart_id;
          res.status(400).send(temp);
        } else {
          let mess =
            "Deleted Book with isbn: " +
            req.body.isbn +
            " from cart_id: " +
            req.body.cart_id;
          res.status(200).send(mess);
        }
      }
    }
  );
});

module.exports = router;

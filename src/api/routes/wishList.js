const { request } = require("express");
const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const { Client } = require("pg");
const pw = "SinghisKing316!";

const connectionString =
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

const client = new Client({
  connectionString: connectionString
});
client.connect();

router.get("/", async (req, res) => {
  console.log("hola!");
  res.send("in wishList");
});

/*function uuidv4() {
  //bad uuid function need to switch uuid to include text
  return new Date()
    .getTime()
    .toString()
    .substring(0, 10);
}
*/

function getTimestamp() {
  return new Date();
}

//Retrieve Endpoint to get the list of books in the Wishlist
router.post("/getWish_Lists", async (req, res) => {
  console.log(req.body);
  /*console.log(
  "SELECT wish_lists.list_name, books.isbn, books.title, books.description, books.price, books.genre, books.year_published, books.copies_sold, authors.f_name, authors.l_name, authors.publisher FROM wish_lists INNER JOIN wish_list_items ON (wish_lists.list_id = wish_list_items.list_id) INNER JOIN books ON (wish_list_items.isbn = books.isbn) INNER JOIN authors ON (books.author_id = authors.author_id) WHERE user_id = " + req.body.user_id + " AND list_name like '" + req.body.list_name + "'" );*/
  client.query(
    "SELECT wish_lists.list_name, books.isbn, books.title, books.description, books.price, books.genre, books.year_published, books.copies_sold, authors.f_name, authors.l_name, authors.publisher FROM wish_lists INNER JOIN wish_list_items ON (wish_lists.list_id = wish_list_items.list_id) INNER JOIN books ON (wish_list_items.isbn = books.isbn) INNER JOIN authors ON (books.author_id = authors.author_id) WHERE user_id = " + req.body.user_id + " AND list_name like '" + req.body.list_name + "'",
    //"SELECT isbn FROM wish_list_items WHERE list_id = (SELECT list_id FROM wish_lists WHERE user_id = " + req.body.user_id + ")", 
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    }
  );
});
//------------------------------------------------------------------------------------------------------------------------------


//creates a wishlist for a user via user_id
router.post("/", async (req, res) => {
  //console.log(req.body.list_id);
  console.log(req.body.list_name);
  console.log(req.body.email);
  client.query(
    "call uspinsertwishlist(" +
      /*req.body.list_id +
      "', '" + */
      req.body.list_name +
      ", " +
      req.body.email +
      ")",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.message);
      } else {

        res.status(200).send("Successfully created a Wish_List for User");
      }      
    }
  ); 
  });
//-----------------------------------------------------------------------------------------------------------------------------

//adds a book to a shopping cart via cart_id
router.post("/add", async (req, res) => {
  
  console.log(req.body.list_id);
  console.log(req.body.isbn);

  client.query(
    "INSERT into wish_list_items (list_id, isbn) VALUES (" +
      req.body.list_id +
      ", " +
      req.body.isbn +
      ")",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.detail);
      } else {
        res.status(200).send("Successfully added a book to the wishlist");
      }
    }
  );
});

router.delete("/", (req, res) => {
  console.log("the body,", req.body);
  client.query(
    "call usppushtoshoppingcart(" +
      req.body.isbn +
      ", " +
      req.body.list_name +
      ", " +
      req.body.email +
      ") ",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.message);
      } else {
        res.status(200).send("Book moved to Shopping Cart");
        
      }
    }
  );
});

// router.delete("/", async(req,res)=>{
//   client.query("")
// })

module.exports = router;

const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const pw = "Backend35";

const connectionString = 
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

const client = new Client({
  connectionString: connectionString
})
client.connect();

router.get("/", async (req, res) => {
  console.log("hello");
  res.send("in book details");
});

router.post("/insert_book", async (req, res) => {
   console.log(req.body);
   client.query(
     "call uspinsertbook(" +
     req.body.isbn +
      ", " +
      req.body.title +
      ", " +
      req.body.price +
      ", " +
      req.body.f_name +
      ", " +
      req.body.l_name +
      ", " +
      req.body.genre +
      ", " +
      req.body.publisher +
      ", " +
      req.body.year_published +
      ", " +
      req.body.copies_sold +
      ", " +
      req.body.description +
      ");",
      function(err, result) {
        if (err) {
          console.log(err);
          res.status(400).send(err.message);
        } else {
          res.status(200).send("Successfully created a book");
        }
    }
   )   
  })

  router.post("/insert_author", async (req, res) => {
    console.log(req.body);
    client.query(
      "call insertauthors(" +
       req.body.f_name +
       ", " +
       req.body.l_name +
       ", " +
       req.body.publisher +
       ", " +
       req.body.biography +
       ");",
       function(err, result) {
         if (err) {
           console.log(err);
           res.status(400).send(err.message);
         } else {
           res.status(200).send("Successfully created a author");
         }
     }
    )   
   })

    // retrieve book deatils from the ISBN
    router.post("/isbn", async (req, res) => {
      console.log(req.body);
      client.query(
        "SELECT books.isbn, books.title, books.description, books.price, authors.f_name, authors.l_name, authors.publisher, books.genre, books.year_published, books.copies_sold FROM books INNER JOIN authors ON (books.author_id = authors.author_id) WHERE isbn = " +       req.body.isbn,
        function(err, result) {
          console.log(result)
          console.log(typeof(result))
          if (err) { 
            console.log(err);
            res.status(400).send(err);
          }
          if(Object.keys(result.rows).length ===0){
            console.log("Invalid ISBN")
            res.status(400).send("Invalid ISBN")
          }
          else {res.status(200).send(result.rows);}
        }
      );
    });

    // retrieve books from the same author
    router.post("/author", async (req, res) => {
      console.log(req.body);
      client.query(
        "SELECT books.isbn, books.title, books.description, books.price, authors.f_name, authors.l_name, authors.publisher, books.genre, books.year_published, books.copies_sold FROM books INNER JOIN authors ON (books.author_id = authors.author_id) WHERE f_name = " +       req.body.f_name + " AND l_name = " + req.body.l_name + " AND publisher = " + req.body.publisher,
        function(err, result) {
          console.log(result)
          console.log(typeof(result))
          if (err) { 
            console.log(err);
            res.status(400).send(err);
          }
          if(Object.keys(result.rows).length ===0){
            console.log("Invalid Author")
            res.status(400).send("Invalid Author")
          }
          else {res.status(200).send(result.rows);}
        }
      );
    });
module.exports = router;
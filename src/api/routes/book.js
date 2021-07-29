const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const pw = "0105.Eenajved";

const connectionString =
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

const client = new Client({
  connectionString: connectionString
});
client.connect();
router.get("/", async (req, res) => {
  console.log("hola!");
  res.send("in book");
});

// Must be able to retrieve List of Books by Genre
router.post("/getBooksByGenre", async (req, res) => {
  console.log(req.body);
  client.query(
    "SELECT title FROM books WHERE genre like " + req.body.genre,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.detail);
      } else if (result.rows.length == 0) {
        console.log(err);
        res.status(400).send("Genre doesn't exist.");
      } else {
        res.status(200).send(result.rows);
      }
    }
  );
});

//Must be able to retrieve List of Top Sellers(Top 10 books that have sold the most copies)
router.get("/top10Sellers", async (req, res) => {
  client.query(
    "SELECT title, copies_sold FROM public.books order by copies_sold desc LIMIT 10;",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    }
  );
});

//Must be able to retrieve List of Books for a particular rating and hig
router.post("/getBooksByRate", async (req, res) => {
  console.log(req.body);
  client.query(
    "SELECT title, ratings FROM books AS b INNER JOIN ratings_comments AS r ON b.isbn=r.isbn WHERE r.ratings >= " +
      req.body.rate +
      "ORDER BY r.ratings ASC",
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.detail);
      } else if (result.rows.length == 0) {
        console.log(err);
        res.status(400).send("Books not found");
      } else {
        res.status(200).send(result.rows);
      }
    }
  );
});

// Must be able to retrieve x number of books where x is an integer
router.post("/getBooksByNum", async (req, res) => {
  console.log(req.body);
  client.query(
    "SELECT title FROM books ORDER BY title ASC limit " + req.body.num,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err.detail);
      } else if (result.rows.length == 0) {
        console.log(err);
        res.status(400).send("Invalid entry has been made.");
      } else {
        res.status(200).send(result.rows);
      }
    }
  );
});

module.exports = router;

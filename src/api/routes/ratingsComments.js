const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const pw = "fiu";

const connectionString =
  "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

const client = new Client({
  connectionString: connectionString
});
client.connect();

router.get("/", async (req, res) => {
  console.log("hola!");
  res.send("in ratingsComments");
});

//Retrieve Endpoint to get the list of comments and ratings for specified book
router.post("/reviews", async(req, res) => {
    console.log(req.body);
    client.query(
        "SELECT * from ratings_comments where isbn = " + req.body.isbn + "order by ratings desc",
        function(err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        }
    );
});

//Get average ratings of a specific book
router.post("/averageRating", async(req, res) => {
    console.log(req.body);
    client.query(
        "SELECT avg(ratings) from ratings_comments where isbn = " + req.body.isbn,
        function(err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        }
    );
});

//create a rating and persist to the database
router.post("/createRating", async(req, res) => {
    if (req.body.ratings > 5 || req.body.ratings < 1) {
        res.status(666).send("Rating must be a value from 1 to 5.");
    }
    console.log("User ID: " + req.body.user_id);
    console.log("ISBN: " + req.body.isbn);
    console.log("Rating: " + req.body.ratings);
    console.log(
        "INSERT into ratings_comments (user_id, isbn, ratings) VALUES (" +
        req.body.user_id +
        ", " +
        req.body.isbn +
        ", " +
        req.body.ratings +
        ")"
    );
    client.query(
        "call createrating(" +
        req.body.user_id +
        ", " +
        req.body.isbn +
        ", " +
        req.body.ratings +
        ")",
        function(err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err.detail);
            } else {
                res.status(200).send("Successfully Created A Comment/Rating");
            }
        }
    );
});

//create a comment and persist to the database
router.post("/createComment", async(req, res) => {
    console.log("User ID: " + req.body.user_id);
    console.log("ISBN: " + req.body.isbn);
    console.log("Comment: " + req.body.comments);
    console.log(
        "INSERT into ratings_comments (user_id, isbn, comments) VALUES (" +
        req.body.user_id +
        ", " +
        req.body.isbn +
        ", " +
        req.body.comments +
        ")"
    );
    client.query(
        "call createcomment(" +
        req.body.user_id +
        ", " +
        req.body.isbn +
        ", " +
        req.body.comments +
        ")",
        function(err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err.detail);
            } else {
                res.status(200).send("Successfully Created A Comment/Rating");
            }
        }
    );

});

module.exports = router;

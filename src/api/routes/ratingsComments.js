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

router.get("/", async(req, res) => {
    console.log("hola!");
    res.send("in ratingsComments");
});

//Retrieve Endpoint to get the list of comments and ratings
router.post("/getRatings", async(req, res) => {
    console.log(req.body);
    client.query(
        "SELECT * from ratings_comments where isbn = " + req.body.isbn,
        function(err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        }
    );
});

//create a comment/rating and persist to the database
router.post("/", async(req, res) => {
    console.log("User ID: " + req.body.user_id);
    console.log("ISBN: " + req.body.isbn);
    console.log("Rating: " + req.body.ratings);
    console.log("Rating Date: " + req.body.r_date);
    console.log("Comment: " + req.body.comments);
    console.log("Comment Date: " + req.body.c_date);
    console.log(
        "INSERT into ratings_comments (user_id, isbn, ratings, r_date, comments, c_date) VALUES (" +
        req.body.user_id +
        ", " +
        req.body.isbn +
        ", " +
        req.body.ratings +
        ", " +
        req.body.r_date +
        ", " +
        req.body.comments +
        ", " +
        req.body.c_date +
        ")"
    );
    client.query(
        "INSERT into ratings_comments (user_id, isbn, ratings, r_date, comments, c_date) VALUES (" +
        req.body.user_id +
        ", " +
        req.body.isbn +
        ", " +
        req.body.ratings +
        ", " +
        req.body.r_date +
        ", " +
        req.body.comments +
        ", " +
        req.body.c_date +
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
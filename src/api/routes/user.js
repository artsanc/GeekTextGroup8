const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const pw = "polk640320";

const connectionString =
    "postgres://postgres:" + pw + "@localhost:5432/Bookstore8";

const client = new Client({
    connectionString: connectionString
});
client.connect().then(() => {
    console.log("I am connected to the DB");
})

//Create User
router.post("/", (req, res) => {
    console.log(req.body);
    client.query(
        "call uspinsertuser('" +
        req.body.email +
        "', '" +
        req.body.password +
        "', '" +
        req.body.f_name +
        "', '" +
        req.body.l_name +
        "', '" +
        req.body.address + "');",
        function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err.message);
            }
            else {
                res.status(200).send("Successfully created User");
            }
        }
    );
});

//Retrieve User
router.post("/getUser", (req, res) => {
    console.log(req.body);
    client.query(
        "select * from udfretrieveuser('" + req.body.email + "');",
        function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err.message);
            }
            else {
                res.status(200).send(result.rows);
            }
        }
    );
});

//

module.exports = router;
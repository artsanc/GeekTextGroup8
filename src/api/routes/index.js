const express = require("express");
const router = express.Router();
const shoppingCartRoute = require("../routes/shoppingCart.js");
const userRoute = require("../routes/user");
const bookRoute = require("../routes/book");
const bookDetailsRoute = require("../routes/bookDetails");
const wishListRoute = require("../routes/wishList");
const ratingsCommentsRoute = require("../routes/ratingsComments");

router.use("/user/shoppingCart", shoppingCartRoute);
router.use("/user", userRoute);
router.use("/book", bookRoute);
router.use("/book/details", bookDetailsRoute);
router.use("/user/wishlist", wishListRoute);
router.use("/book/ratingsComments", ratingsCommentsRoute);

router.get("/", async (req, res) => {
  res.send("index");
});

module.exports = router;

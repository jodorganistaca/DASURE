const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("../");
  }
);

module.exports = router;

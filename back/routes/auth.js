const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../db/MongoUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//TODO: Add authentication for non Google users
/* GET home page. */
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.post("/", function(req, res) {
  const { email, password } = req.body;
            db.findOneObjectPromise("application", "users", {email: email})
            .then(user => {
              if(!user&&user[0])
              {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
              }
              else
              {
                const usr = user[0];
                console.log(usr);
                bcrypt.compare(password, usr.password)
                .then(match => {
                  if(!match)
                  {
                    return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
                  }
                  else
                  {
                    const payload = {
                      user: {
                          _id: usr._id,
                          email: usr.email,
                          name: user.name
                      },
                  };
                  console.log("create", process.env.JWT_SECRET);
                  jwt.sign(
                      payload,
                      process.env.JWT_SECRET,
                      { expiresIn: 36000 },
                      (error, token) => {
                          if (error) throw error;
                          res.json({ token });
                      });
                  }
                })
              }
            })
});

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
     // Successful authentication, redirect home.
     res.redirect("../");
  }
);


module.exports = router;

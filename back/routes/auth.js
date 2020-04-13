const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../db/MongoUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.post("/", function(req, res) {
    const { email, password } = req.body;
    res.clearCookie("x-access-token");
    console.log(email);
    db.findOneObjectPromise("application", "users", {email: email})
        .then(user => {
            if(!user||!user[0])
            {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            else
            {
                const usr = user[0];
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
                                    name: usr.name
                                },
                            };
                            console.log("create", process.env.JWT_SECRET);
                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                { expiresIn: 36000 },
                                (error, token) => {
                                    if (error) throw error;
                                    let options = {
                                        path:"/",
                                        sameSite:true,
                                        maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
                                        httpOnly: true, // The cookie only accessible by the web server
                                    };
                                    console.log("Token created", token);
                                    res.cookie("x-access-token",token, options);
                                    res.json(token);
                                });
                        }
                    });
            }
        });
});

router.get(
    "/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect home.
        //TODO: Heroku login
        res.redirect("http://localhost:3000");
    }
);

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});

module.exports = router;

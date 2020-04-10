const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db/MongoUtils");

/* GET home page. */
router.get("/", function(req, res) {
    res.render("index", { title: "Express" });
});

router.get("/login", function(req, res)
{
    res.render("login");
});

router.get("/signup", function(req, res)
{
    res.render("signup");
});

router.get("/edit_profile", function(req, res){
  
    console.log(req.cookies);
    const token = req.cookies["x-access-token"];
    if (token)
    {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const {name, email, _id} = decoded.user;
            return res.render("users", {name, email, _id});
        }
        catch  (error)
        {
            return res.status(401).json({msg: "Token is not valid"});
        }
    }
    else
    {
        if(!req.user)
        {
            return res.status(403).json({msg: "No user logged"});
        }
        const {name, email, _id} = req.user.value;

        //Update Google Photo
        return fetch("https://people.googleapis.com/v1/people/me?personFields=photos")
            .then(data => {
                const photo = data.photos[0].url;
                db.findAndUpdateOnePromise("application", "users", _id, {photo});
                return res.render("users", {name, email, _id});
            });
    }
});

module.exports = router;

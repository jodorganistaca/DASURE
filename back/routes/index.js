const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", function(req, res)
{
res.render("login")
});

router.get("/signup", function(req, res)
{
res.render("signup")
});

router.get("/edit_profile", function(req, res){
  
  console.log(req.cookies);
  const token = req.cookies['x-access-token'];
  if (token)
  {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {name, email, _id} = decoded.user;
        return res.render("users", {name, email, _id});
    }
    catch
    {
      return res.status(401).json({msg: "Token is not valid"});
    }
  }
  else
  {
    const {name, email, _id} = req.user.value;
    return res.render("users", {name, email, _id});
  }
})

module.exports = router;

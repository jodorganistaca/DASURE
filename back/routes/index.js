const express = require('express');
const router = express.Router();
const passport = require("passport");

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
  if(req.user)
  {
    console.log("render");
    console.log(req.user);
    const {name, email, _id} = req.user.value;
    res.render("users", {name, email, _id});
  }
  else
  res.status(404).redirect("../")
})

module.exports = router;

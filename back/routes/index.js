const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function(req, res) {
    res.render("index", { title: "Express" });
});


router.get('/create/:type', (req, res) => {
    if(req.params.type == 'Workout'){
        res.render('createWorkout', { type: "rutina"});
    }else{
        res.render('create', { type: req.params.type});
    }

});

router.get('/get/:type', (req, res) => {
  console.log(req.params);
  db.getDocumentsPromise('COVID-19Web', req.params.type)
      .then(data => {
        return res.json(data);
      })
      .catch(err => res.render("index",{
        err
      }));
});

router.get('/update_delete/:type', (req, res) => {
    console.log(req.params);
    db.getDocumentsPromise('COVID-19Web', req.params.type)
        .then(data => {
            return res.render("UpdateOrDelete", {data, type: req.params.type});
        })
        .catch(err => res.render("index",{
            err
        }));
});

router.post('/create/:type', (req, res) => {
    console.log(req.params, req.body);
  db.createOneDocumentPromise('COVID-19Web', req.params.type, req.body)
      .then(res.redirect("/update_delete/"+req.params.type))
      .catch(err => res.render("index", {
        title: "Mongo Explorer",
        error: err,
        readme: "https://github.com/jsbravo-sw/mongo-explorer/blob/master/README.md"
      }));
});

router.post("/delete/:type/:_id", function (req, res) {
    db.findAndDeleteOnePromise('COVID-19Web', req.params.type, req.params._id)
        .then(res.redirect("/update_delete/"+req.params.type))
        .catch(err => res.render("index", {
            title: "Mongo Explorer",
            error: err,
            readme: "https://github.com/jsbravo-sw/mongo-explorer/blob/master/README.md"
        }));

});

router.post("/update/:type/:_id", function (req, res) {
    db.findAndUpdateOnePromise('COVID-19Web', req.params.type, req.params._id, req.body)
        .then(res.redirect("/update_delete/"+req.params.type))
        .catch(err => res.render("index", {
            title: "Mongo Explorer",
            error: err,
            readme: "https://github.com/jsbravo-sw/mongo-explorer/blob/master/README.md"
        }));

});
=======
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
        return res.render("users", {name, email, _id});
    }
});

module.exports = router;

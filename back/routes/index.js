var express = require('express');
var router = express.Router();
let db  = require('../db/MongoUtils')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
module.exports = router;

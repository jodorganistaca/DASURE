var express = require('express');
var router = express.Router();
let db  = require('../db/MongoUtils')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create/:type', (req, res) => {
    if(req.params.type == 'Workout'){
        res.render('create', { type: req.params.type, item: {}});
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



router.post('/create/:type', (req, res) => {
    console.log(req.params, req.body);
  db.createOneDocumentPromise('COVID-19Web', req.params.type, req.body)
      .then(res.redirect(req.get("/get/:type")))
      .catch(err => res.render("index", {
        title: "Mongo Explorer",
        error: err,
        readme: "https://github.com/jsbravo-sw/mongo-explorer/blob/master/README.md"
      }));
});

module.exports = router;

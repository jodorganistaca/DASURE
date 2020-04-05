const express = require('express');
const router = express.Router();
const db = require("../db/MongoUtils");

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getDocumentsPromise("application", "users")
  .then(docs => res.json(docs))
});

router.get('/:id', function(req, res, next) {
  db.findOnePromise("application", "users", req.params.id)
  .then(docs => res.json(docs))
});

router.post('/', function(req, res, next) {
  const {name, username, password, email} = req.body;
  db.createOneDocumentPromise("application", "users", {name: name, password: password, email: email})
  .then(docs => res.json(docs))
});

router.put('/:id', function(req, res, next) {
  console.log(req.body);
  const {name, password, email} = req.body;
  db.findAndUpdateOnePromise("application", "users", req.params.id, {name: name, password: password, email: email})
  .then(docs => res.json(docs))
});

router.delete('/:id', function(req, res, next) {
  db.findAndDeleteOnePromise("application", "users", req.params.id)
  .then(docs => res.json(docs))
});

module.exports = router;

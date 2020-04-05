const express = require('express');
const router = express.Router();
const db = require("../db/MongoUtils");

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getDocumentsPromise("application", "users")
  .then(docs => res.json(docs))
});

router.post('/', function(req, res, next) {
  const {username, password, email} = req.body;
  db.createOneDocumentPromise("application", "users", {username: username, password: password, email: email})
  .then(docs => res.json(docs))
});

router.put('/', function(req, res, next) {
  const {id, username, password, email} = req.body;
  db.findAndUpdateOnePromise("application", "users", id, {username: username, password: password, email: email})
  .then(docs => res.json(docs))
});

router.delete('/:id', function(req, res, next) {
  const {id} = req.body;
  db.findAndDeleteOnePromise("application", "users", id)
  .then(docs => res.json(docs))
});

module.exports = router;

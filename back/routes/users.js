const express = require('express');
const router = express.Router();
const db = require("../db/MongoUtils");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getDocumentsPromise("application", "users")
  .then(docs => res.json(docs))
});

router.get('/:id', function(req, res, next) {
  db.findOnePromise("application", "users", req.params.id)
  .then(docs => res.json(docs))
});

// @route  POST /users
// @desc   Register user
// @access Public
router.post('/', function(req, res, next) {
  const {name, password, email} = req.body;
  bcrypt.genSalt(10)
  .then(salt => bcrypt.hash(password, salt))
  .then(encryptedPassword => db.createOneDocumentPromise("application", "users", {name: name, password: encryptedPassword, email: email}))
  .then(docs => {
    if (docs.result.ok == true)
      res.status(201).json({name: name, email: email, result: "ok"})
    else
      res.status(401).json({error: "Error"})
  })
});

// @route  PUT /users/:id
// @desc   Update user
// @access Public
router.put('/:id', function(req, res, next) {
  const {name, password, email} = req.body;
  bcrypt.genSalt(10)
  .then(salt => bcrypt.hash(password, salt))
  .then(encryptedPassword => db.findAndUpdateOnePromise("application", "users", req.params.id, {name: name, password: encryptedPassword, email: email}))
  .then(docs => {
    if (docs.result.ok == true)
      res.status(200).json({name: name, email: email, result: "ok"})
    else
      res.status(401).json({error: "Error"})
})});

// @route  DELETE /users/:id
// @desc   Delete user
// @access Public
router.delete('/:id', function(req, res, next) {
  db.findAndDeleteOnePromise("application", "users", req.params.id)
  .then(docs => res.json(docs))
});

module.exports = router;

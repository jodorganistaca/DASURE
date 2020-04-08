const express = require('express');
const router = express.Router();
const db = require("../db/MongoUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET all posts. */
router.get('/', function(req, res, next) {
  db.getDocumentsPromise("application", "posts")
  .then(docs => res.json(docs))
});

router.get('/:id', function(req, res, next) {
  db.findOnePromise("application", "posts", req.params.id)
  .then(docs => res.json(docs))
});

// @route  POST /posts
// @desc   Create a post
// @access Private
router.post('/', function(req, res, next) {
    //const token = req.cookies['x-access-token'];
    const token = req.header("x-auth-token");
    console.log(token);
    const {newText, newComment, newLike} = req.body;
    let _id;
    let name;
    let email;
    if (token)
    {
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          _id = decoded.user._id;
          name = decoded.user.name;
          email = decoded.user.email;
      }
      catch
      {
        return res.status(401).json({msg: "Token is not valid"});
      }
    }
    else
    {
      _id = req.user.value._id;
      name = req.user.value.name;
      email = req.user.value.email;
    }
    if(!_id)
    {
        return res.status(403).json({msg: "Not authorized"});
    }
    const {text, tags} = req.body;
    if(!text || !tags)
    {
        return res.status(400).json({msg: "Text and tags are required"});
    }
    tagsArray = tags.split(",").map(tag => tag.trim());

    db.createOneDocumentPromise("application", "posts", {
        text: text, 
        comments: [],
        likes: [],
        tags: tagsArray,
        user: _id,
        name: name,
        email: email
    })
          .then(docs => {
                    console.log(docs);
                    return res.status(200).json({
                        _id: docs.insertedId,
                        text: text, 
                        comments: [],
                        likes: [],
                        tags: tagsArray,
                        user: _id,
                        name: name,
                        email: email
                    });
                } 
          );
});

// @route  PUT /posts/:id
// @desc   Update posts
// @access Public
router.put('/:id', function(req, res, next) {
    //const token = req.cookies['x-access-token'];
    const token = req.header("x-auth-token");
    const {newText, newComment, newLike} = req.body;
    let _id;
    if (token)
    {
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
           _id = decoded.user._id;
      }
      catch
      {
        return res.status(401).json({msg: "Token is not valid"});
      }
    }
    else
    {
      _id = req.user.value._id;
    }
    if(!_id)
    {
        return res.status(403).json({msg: "Not authorized"})
    }
    db.findOnePromise("application", "posts", req.params.id)
          .then(docs => {
            doc = docs[0];
            if(!doc)
            {
                return res.status(404).json({msg: "Document not found"});
            }
            else
            {
                if(doc.user != _id && newText)
                {
                    return res.status(403).json({msg: "Not authorized"});
                }
                else if(!newText && (newComment || newLike))
                {
                    const updatedObject = {}
                    if(newComment)
                        {
                    updatedObject.comments = (doc.comments.length == 0)  ?  [newComment] : doc.comments.push(newComment);
                    db.findAndUpdateOnePromise("application", "posts", doc._id, 
                    updatedObject, {$push: {comments: newComment}})
                    updatedObject._id = doc._id
                    return res.status(200).json(updatedObject);
                        }
                    if(newLike)
                    {
                    updatedObject.likes = (doc.likes.length == 0) ? [newLike] : doc.likes.push(newLike);
                    db.findAndUpdateOnePromise("application", "posts", doc._id, 
                    updatedObject, {$push: {likes: newLike}})
                    updatedObject._id = doc._id
                    return res.status(200).json(updatedObject);
                }
            }
            else
                {
                    db.findAndUpdateOnePromise("application", "posts", doc._id, 
                    {
                        text: newText
                    })
                    return res.status(200).json({
                        _id: doc._id,
                        text: newText, 
                        comments: doc.comments,
                        likes: doc.likes,
                        tags: doc.tags,
                        user: doc.user,
                        name: doc.name,
                        email: doc.email
                    });
            }
            }
          });
});

// @route  DELETE /posts/:id
// @desc   Delete posts
// @access Public
router.delete('/:id', function(req, res, next) {
  db.findAndDeleteOnePromise("application", "posts", req.params.id)
  .then(docs => res.json(docs))
});

module.exports = router;

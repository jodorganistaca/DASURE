const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");
const jwt = require("jsonwebtoken");

/* GET all posts. */
router.get("/", function (req, res) {
    db.getDocumentsPromise("application", "posts")
        .then(docs => res.json(docs));
});

router.get("/:id", function (req, res) {
    db.findOnePromise("application", "posts", req.params.id)
        .then(docs => res.json(docs));
});

// @route  POST /posts
// @desc   Create a post
// @access Private
router.post("/", function (req, res) {
    const token = req.cookies["x-access-token"];
    //const token = req.header("x-auth-token");
    let _id;
    let name;
    let email;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            _id = decoded.user._id;
            name = decoded.user.name;
            email = decoded.user.email;
        } catch (error){
            return res.status(401).json({
                msg: "Token is not valid"
            });
        }
    } else {
        if (!req.user) {
            return res.status(403).json({
                msg: "No user logged"
            });
        }
        _id = req.user.value._id;
        name = req.user.value.name;
        email = req.user.value.email;
    }
    if (!_id) {
        return res.status(403).json({
            msg: "Not authorized"
        });
    }
    const {
        text,
        category,
        image,
        title
    } = req.body;
    if (!text || !category || !image) {
        return res.status(400).json({
            msg: "Text, category & image are required"
        });
    }
    db.findOnePromise("application", "users", _id)
        .then(usr => {
            const photo = usr[0].photo;
            db.createOneDocumentPromise("application", "posts", {
                text: text,
                comments: [],
                likes: [],
                dislikes: [],
                category,
                user: _id,
                name,
                image,
                email,
                photo,
                title,
                date: Date.now()
            }).then(docs => {
                return res.status(200).json({
                    _id: docs.insertedId,
                    text,
                    comments: [],
                    likes: [],
                    dislikes: [],
                    category,
                    user: _id,
                    name,
                    image,
                    photo,
                    email,
                    title,
                    date: Date.now()
                });
        
            });
        
        });
});
    

// @route  PUT /posts/:id
// @desc   Update posts
// @access private
//TODO: Add posts/:id/:commentid to delete it.
router.put("/:id", function (req, res) {
    const token = req.cookies["x-access-token"];
    //const token = req.header("x-auth-token");
    const {
        text,
        comment,
        like,
        dislike
    } = req.body;
    console.log("Comentario", comment);
    console.log(req.body);
    let _id;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            _id = decoded.user._id;
        } catch (error) {
            return res.status(401).json({
                msg: "Token is not valid"
            });
        }
    } else {
        if (!req.user) {
            return res.status(403).json({
                msg: "No user logged"
            });
        }
        _id = req.user.value._id;
    }
    if (!_id) {
        return res.status(403).json({
            msg: "Not authorized"
        });
    }
    console.log("Is authorized");
    db.findOnePromise("application", "posts", req.params.id)
        .then(docs => {
            const doc = docs[0];
            if (!doc) {
                return res.status(404).json({
                    msg: "Document not found"
                });
            } else {
                if (doc.user != _id && text) {
                    return res.status(403).json({
                        msg: "Not authorized"
                    });
                } else if (!text && (comment || like || dislike)) {
                    const updatedObject = {};
                    if (comment) {
                        console.log("Es un comentario");
                        return db.findOnePromise("application", "users", _id)
                            .then(usr => {
                                updatedObject._id = doc._id;
                                updatedObject.comments = (doc.comments.length == 0) ? [{
                                    text: comment,
                                    user: _id,
                                    name: usr[0].name,
                                    photo: usr[0].photo,
                                    date: Date.now()
                                }] : doc.comments.push({
                                    text: comment,
                                    user: _id,
                                    name: usr[0].name,
                                    photo: usr[0].photo,
                                    date: Date.now()
                                });
                                return db.findAndUpdateOnePromise("application", "posts", doc._id,
                                    updatedObject, {
                                        $push: {
                                            comments: {
                                                text: comment,
                                                user: _id,
                                                date: Date.now(),
                                                name: usr[0].name,
                                                photo: usr[0].photo
                                            }
                                        }
                                    })
                                    .then(() => {
                                        console.log("Voy a retornar");
                                        console.log(updatedObject);
                                        return res.status(200).json(doc);
                                    });
                                
                                
                            });
                    }
                    if (like) {
                        if(doc.likes && doc.likes.length > 0 && doc.likes.filter(e => e === _id).length>0)
                        {
                            return res.status(400).json({msg: "Post already liked"});
                        }
                        updatedObject.likes = (doc.likes.length == 0) ? [_id] : doc.likes.push(_id);
                        updatedObject.dislikes = (doc.dislikes.length == 0) ? [] : doc.dislikes;
                        db.findAndUpdateOnePromise("application", "posts", doc._id,
                            updatedObject, {
                                $push: {
                                    likes: _id
                                }
                            });
                        updatedObject._id = doc._id;
                        return res.status(200).json(updatedObject);
                    }
                    if (dislike) {
                        console.log(doc.dislikes, doc.dislikes.length, doc.dislikes.filter(e => e === _id));
                        if(doc.dislikes && doc.dislikes.length > 0 && doc.dislikes.filter(e => e === _id).length>0)
                        {
                            return res.status(400).json({msg: "Post already disliked"});
                        }
                        updatedObject.dislikes = (doc.dislikes.length == 0) ? [_id] : doc.dislikes.push(_id);
                        updatedObject.likes = (doc.likes.length == 0) ? [] : doc.likes;
                        db.findAndUpdateOnePromise("application", "posts", doc._id,
                            updatedObject, {
                                $push: {
                                    dislikes: _id
                                }
                            });
                        updatedObject._id = doc._id;
                        return res.status(200).json(updatedObject);
                    }
                } else if (text) {
                    db.findAndUpdateOnePromise("application", "posts", doc._id, {
                        text: text
                    });
                    return res.status(200).json({
                        _id: doc._id,
                        text: text,
                        comments: doc.comments,
                        likes: doc.likes,
                        dislikes: doc.dislikes,
                        category: doc.category,
                        user: doc.user,
                        name: doc.name,
                        email: doc.email
                    });
                }
                else return res.status(400).json({msg: "Bad Request"});
            }
        });
});

// @route  DELETE /posts/:id
// @desc   Delete posts
// @access Public
router.delete("/:id", function (req, res) {
    db.findAndDeleteOnePromise("application", "posts", req.params.id)
        .then(docs => res.json(docs));
});

module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/* GET users listing. */
router.get("/", function(req, res) {
    db.getDocumentsPromise("application", "users")
        .then(docs => res.json(docs));
});

router.get("/:id", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(docs => res.json(docs));
});

// @route  POST /users
// @desc   Register user
// @access Public
router.post("/", function(req, res) {
    const {name, password, email} = req.body;
    const photo = "https://www.twago.es/img/2018/default/no-user.png";
    res.clearCookie("x-access-token");
    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(encryptedPassword => db.createOneDocumentPromise("application", "users", {name, password: encryptedPassword, email, photo, followedCategories:[], checklist:[], likedSeries:[], likedActivities:[], likedBooks:[], likedMovies:[]}))
        .then(docs => {
            if (docs.result.ok == true && docs.ops[0])
            {
                console.log(docs.ops[0]._id);
                const payload = {
                    user: {
                        _id: docs.ops[0]._id,
                        email: docs.ops[0].email,
                        name: docs.ops[0].name
                    },
                };
                console.log("created", process.env.JWT_SECRET);
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 36000 },
                    (error, token) => {
                        if (error) throw error;
                        res.setHeader("Cache-Control", "private");
                        try{
                            console.log("Created token", token);
                            res.cookie("x-access-token", token, {maxAge: 36000,
                                httpOnly: false});
                        }
                        catch (error){
                            console.log(error);
                        }
                        console.log("Set cookie");
                        res.json(token);
                    });
            }
            else
                res.status(401).json({error: "Error"});
        });
});

// @route  PUT /users/:id
// @desc   Update user
// @access Public
router.put("/:id", function(req, res) {
    const {name, password, email} = req.body;
    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(encryptedPassword => db.findAndUpdateOnePromise("application", "users", req.params.id, {name: name, password: encryptedPassword, email: email}))
        .then(docs => {
            console.log(docs);
            if (docs.ok == true)
                res.status(200).json({name: name, email: email, result: "ok"});
            else
                res.status(401).json({error: "Error"});
        });});

// @route  PUT /users/:id/checklist
// @desc   Update tasks
// @access Public
router.put("/:id/checklist", function(req, res) {
    const {checklist} = req.body;
    db.findAndUpdateOnePromise("application", "users", req.params.id, {checklist: checklist})
        .then(docs => {
            console.log(docs);
            if (docs.ok == true)
                res.status(200).json({checklist, result: "ok"});
            else
                res.status(401).json({error: "Error"});
        });
});

// @route  PUT /users/:id/likedMovies
// @desc   Update tasks
// @access Public
router.put("/:id/likedMovies/:id_movie", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let likedMovies = usr[0].likedMovies;
            likedMovies.push(req.params.id_movie);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{likedMovies},{$push:{likedMovies: req.params.id_movie}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({likedMovies, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  PUT /users/:id/likedMovies
// @desc   Update tasks
// @access Public
router.delete("/:id/likedMovies/:id_movie", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let likedMovies = usr[0].likedMovies;
            likedMovies = likedMovies.filter(e=> e !== req.params.id_movie);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{likedMovies},{$pull:{likedMovies: req.params.id_movie}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({likedMovies, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  PUT /users/:id/likedMovies
// @desc   Update tasks
// @access Public
router.put("/:id/likedSeries/:id_series", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let likedSeries = usr[0].likedSeries;
            likedSeries.push(req.params.id_series);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{likedSeries},{$push:{likedSeries: req.params.id_series}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({likedSeries, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  PUT /users/:id/likedMovies
// @desc   Update tasks
// @access Public
router.delete("/:id/likedSeries/:id_series", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let likedSeries = usr[0].likedSeries;
            likedSeries = likedSeries.filter(e=> e !== req.params.id_series);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{likedSeries},{$pull:{likedSeries: req.params.id_series}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({likedSeries, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  PUT /users/:id/likedActivities
// @desc   Update tasks
// @access Public
router.put("/:id/likedActivities/:id_activity", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let likedActivities = usr[0].likedActivities;
            likedActivities.push(req.params.id_activity);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{likedActivities},{$push:{likedActivities: req.params.id_activity}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({likedActivities, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  DELETE /users/:id/likedActivities
// @desc   Update tasks
// @access Public
router.delete("/:id/likedActivities/:id_activity", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let likedActivities = usr[0].likedActivities;
            likedActivities = likedActivities.filter(e => e !== req.params.id_activity);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{likedActivities},{$pull:{likedActivities: req.params.id_activity}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({likedActivities, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  PUT /users/:id/likedBooks
// @desc   Update tasks
// @access Public
router.put("/:id/likedBooks/:id_book", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let likedBooks = usr[0].likedBooks;
            likedBooks.push(req.params.id_book);
            
            db.findAndUpdateOnePromise("application", "users", req.params.id,{likedBooks},{$push:{likedActivities: req.params.id_book}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({likedBooks, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  Delete /users/:id/likedBooks
// @desc   Update tasks
// @access Public
router.delete("/:id/likedBooks/:id_book", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let likedBooks = usr[0].likedBooks;
            likedBooks = likedBooks.filter(e => e !== req.params.id_activity);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{likedBooks},{$pull:{likedActivities: req.params.id_book}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({likedBooks, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});


// @route  Delete /users/:id/likedBooks
// @desc   Update tasks
// @access Public
router.delete("/:id/followedPosts/:id_posts", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let followedPosts = usr[0].followedPosts;
            followedPosts = followedPosts.filter(e => e !== req.params.id_posts);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{followedPosts},{$pull:{followedPosts: req.params.id_posts}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({followedPosts, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  Delete /users/:id/likedBooks
// @desc   Update tasks
// @access Public
router.put("/:id/followedPosts/:id_posts", function(req, res) {
    db.findOnePromise("application", "users", req.params.id)
        .then(usr => {
            let followedPosts = usr[0].followedPosts;
            followedPosts.push(req.params.id_posts);
            db.findAndUpdateOnePromise("application", "users", req.params.id,{followedPosts},{$push:{followedPosts: req.params.id_posts}})
                .then(docs => {
                    console.log(docs);
                    if (docs.ok == true)
                        res.status(200).json({followedPosts, result: "ok"});
                    else
                        res.status(401).json({error: "Error"});
                });
        });
   
});

// @route  PUT /users/:id/photo/:url_photo
// @desc   Update photo
// @access Public
router.put("/:id/photo/:url_photo", function(req, res) {
    db.findAndUpdateOnePromise("application", "users", req.params.id,{photo: req.params.url_photo})
        .then(docs => {
            console.log(docs);
            if (docs.ok == true)
                res.status(200).json({photo: req.params.url_photo, result: "ok"});
            else
                res.status(401).json({error: "Error"});
        });
   
});

// @route  DELETE /users/:id
// @desc   Delete user
// @access Public
router.delete("/:id", function(req, res) {
    db.findAndDeleteOnePromise("application", "users", req.params.id)
        .then(docs => res.json(docs));
});

module.exports = router;

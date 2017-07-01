'use strict';

let express = require('express');
let cors = require("cors");
let router = express.Router();
let Link = require("./models").Link;


router.param('linkId', (req, res, next, id) => {
    Link.findById(id, (err, doc) => {
        if (err) return next(err);
            if(!doc) {
                err = new Error("Not Found");
                err.stats = 404;
                return next(err);
            }
            req.link = doc;
            return next();
    })
})


// GET all

router.get("/", cors(),(req, res) => {
    Link.find({})
        .sort({createdAt: -1})
        .exec((err, links) => {
            if (err) return next (err);
            res.json(links);    
        });
})


router.post("/", cors(), (req, res) => {
    let link = new Link(req.body);
    link.save((err, link, next) => {
        if (err) return next(err);
        res.status(201);
        res.json(link);
    })
})

router.delete("/:linkId", cors(),(req, res) => {
    Link.findByIdAndRemove(req.link._id, (err, next) => {
        if (err) return next(err);
        res.status(204);
        res.json(req.link)
    })  
})


module.exports = router;
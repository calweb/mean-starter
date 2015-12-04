var express = require('express');
var router = express.Router();
var config = require('../config');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var mongoose = require('mongoose');
var Any = mongoose.Schema({}, {"strict": false});

router.param('collectionName', function (req, res, next, collectionName) {
     req.collection = mongoose.model(collectionName, Any);
    next();
});

// api/collections/:collectionName
router.route('/:collectionName')
    .get(function (req, res, next) {
       req.collection.find({},function(e, results) {

           if (e) return next(e);

           res.status(200).send(results);
       });

    })
    .post(ensureAuthenticated, function (req, res, next) {

        var newPost = req.collection(req.body);
        newPost.save(function () {
            res.status(200).send({msg: "it works"});
        });

    });


// /api/collections/:collectionName/:id
router.route('/:collectionName/:id')
    .get(function (req, res, next) {
        req.collection.findById(req.params.id, function (e, result) {
            if(e) return next(e);
            res.json(result);
        })
    })
    .put(function (req, res) {
        delete req.body._id;
        req.collection.update(req.params.id, {$set: req.body}, function (e, result) {
            res.status(200).send(result);
        })
        
    })
    .delete(function (req, res, next) {
        req.collection.findById(req.params.id, function (e, result) {
            if(e) return next(e);
            result.remove(function () {
                res.status(200).send({msg: 'good job'});
            })

        })
    });

module.exports = router;

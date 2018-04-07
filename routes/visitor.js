var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visitor = require('../models/Visitor.js');

/* GET ALL VisitorS */
router.get('/', function(req, res, next) {
  Visitor.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Visitor BY ID */
router.get('/:id', function(req, res, next) {
  Visitor.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Visitor */
router.post('/', function(req, res, next) {
  Visitor.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Visitor */
router.put('/:id', function(req, res, next) {
  Visitor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Visitor */
router.delete('/:id', function(req, res, next) {
  Visitor.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
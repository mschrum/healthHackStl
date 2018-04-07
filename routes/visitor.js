var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visitor = require('../models/Visitor.js');
const noble = require('noble');

const devices = [];
let backendVisitors;
let knownBids = [];

Visitor.find(function(err, visitors) {
  if (err) return next(err);
  backendVisitors = visitors;
  visitors.forEach(visitor => {
    knownBids.push(visitor.bid);
  });
  console.log(backendVisitors);
  console.log(knownBids);
})

/***************** BLUETOOTH SCANNING AND LOGIC *****************/ 

noble.startScanning();
noble.on('discover', function(device) {

  // UNCOMMENT to get all keys of peripheral.advertisement bluetooth object
  for (let key in device.advertisement) {
    if (device.advertisement.hasOwnProperty(key)) {
        console.log(key + " : " + device.advertisement[key]);
    }
  } 

  let deviceName = device.advertisement.localName;
  if (deviceName) {
    let deviceObject = {};
    deviceObject[deviceName] = device.advertisement;
    devices.push(deviceObject);
    console.log("Found " + deviceName);

    if (knownBids.indexOf(deviceName) >= 0) {
      backendVisitors.forEach(visitor => {
        if (deviceName === visitor.bid) {
          let matchedVisitor = visitor;
          let visitDate = Date.now();
          let visit = {
                        user: {name: matchedVisitor.name, id: matchedVisitor._id},
                        uploaded_date: visitDate,
                        comments: 'Bluetooth Check-In'
                      }
          matchedVisitor.visits.push(visit);
          Visitor.findByIdAndUpdate(matchedVisitor._id, matchedVisitor, function(err, post) {
            if (err) return next(err);
            console.log("Bluetooth check-in logged! " + post);
          });
        }
      });

      console.log('FOUND SOMEONE I RECOGNIZE!! : ' + deviceName);
      
     }
   }
 })

/****************************************************************/ 

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

// this isn't working just yet. TODO: add jade and set viewengine
router.get('/devices', function(req, res, next) {
  res.json(JSON.stringify(devices));
})

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
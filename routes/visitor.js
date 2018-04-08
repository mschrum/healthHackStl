var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visitor = require('../models/Visitor.js');
const noble = require('noble');

const devices = [];
let backendVisitors;
let knownBids = [];
let scanResetTime = 60000;

let getUpdatedVisitors = () => {
  Visitor.find(function (err, visitors) {
    if (err) return next(err);
    backendVisitors = visitors;
    visitors.forEach(visitor => {
      let insensitiveBid = visitor.bid.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
      if (knownBids.indexOf(insensitiveBid) === -1) {
        knownBids.push(insensitiveBid);
        //console.log(`Adding ${insensitiveBid} to knownBids`);
      }
    });
    // console.log(knownBids);
  })
}
getUpdatedVisitors();

setInterval(() => {
  getUpdatedVisitors();
}, 4000);


/***************** BLUETOOTH SCANNING AND LOGIC *****************/

noble.startScanning();
noble.on('discover', function (device) {
  // console.log(device.advertisement.localName);
  if (device.advertisement.localName) {
    let deviceName = device.advertisement.localName.toString().toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, "");
    let deviceObject = {};
    deviceObject[deviceName] = device.advertisement;
    devices.push(deviceObject);
    //console.log("Found " + deviceName);
    if (knownBids.indexOf(deviceName) >= 0) {
      //console.log('FOUND SOMEONE I RECOGNIZE!! : ' + deviceName);
      backendVisitors.forEach(visitor => {
        console.log(`Visitor BID is : ${visitor.bid}`)
        let insensitiveBid = visitor.bid.toString().toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, "");
        if (deviceName === insensitiveBid) {
          let matchedVisitor = visitor;
          let visitDate = Date.now();
          let visit = {
            user: { name: matchedVisitor.name, id: matchedVisitor._id },
            uploaded_date: visitDate,
            comments: 'Bluetooth Check-In'
          }
          matchedVisitor.visits.push(visit);

          Visitor.findByIdAndUpdate(matchedVisitor._id, matchedVisitor, function (err, post) {
            if (err) {
              return next(err);
            }
            console.log("Bluetooth check-in logged! " + post);
          });
        }
      });
    } else {
      console.log(deviceName + " did not match any of: " + knownBids);
    }
  }
})




/****************************************************************/

/* GET ALL VisitorS */
router.get('/', function (req, res, next) {
  Visitor.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Visitor BY ID */
router.get('/:id', function (req, res, next) {
  Visitor.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// this isn't working just yet. TODO: add jade and set viewengine
router.get('/devices', function (req, res, next) {
  res.json(JSON.stringify(devices));
})

/* SAVE Visitor */
router.post('/', function (req, res, next) {
  Visitor.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Visitor */
router.put('/:id', function (req, res, next) {
  Visitor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Visitor */
router.delete('/:id', function (req, res, next) {
  Visitor.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
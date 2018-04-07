var mongoose = require('mongoose');

var VisitorSchema = new mongoose.Schema({
    name: String,
    bid: String, 
    visits: [{}],
});

module.exports = mongoose.model('Visitor', VisitorSchema);
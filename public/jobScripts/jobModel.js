/**
 * Created by Max on 4/27/2015.
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    url: String,
    data: mongoose.Schema.Types.Mixed,
    done: {type: Boolean, default: false}
});

module.exports = mongoose.model('Job', schema);
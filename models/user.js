var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    type: ['user','shop','admin'],
    rif: {type: String, required: false},
    custom: String,
    tlfn: Number,
    name: String,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema, "users");
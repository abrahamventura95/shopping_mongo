var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
    name: {type: String, required: true},
    description: String,
    image: String,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Category', CategorySchema, "categories");
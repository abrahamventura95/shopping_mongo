var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PCategorySchema = Schema({
	product_id: {type: String, required: true},
    category_id: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PCategory', PCategorySchema, "p_categories");
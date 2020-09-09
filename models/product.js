var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    shop_id: {type: String, required: true},
    name: {type: String, required: true},
    description: String,
    image: String,
    price: {type: Number, required: true, default: 0},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema, "products");
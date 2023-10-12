const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_name: {type: String, required: true},
    desc: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    image: {type: String, required: true},
})

const product = mongoose.model('product',ProductSchema);

module.exports = product;
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    products: [{
        product_id: {type: String, required: true},
        product_name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        image: {type: String, required: true},
    }]
})

const cart = mongoose.model('cart',CartSchema);

module.exports = cart;
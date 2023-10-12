const express = require('express');
const router = express.Router();

const {
    show_dashboard,
    send_products,
    show_cart,
    send_cart,
    add_to_cart,
    inc_cart_product,
    dec_cart_product,
    delete_cart_product,
} = require('../controllers/product_controller')


router.get('/dashboard',show_dashboard)

router.post('/get_products',send_products)

router.post('/add_cart',add_to_cart)

router.route('/cart')
.get(show_cart)
.post(send_cart)

router.post('/increase',inc_cart_product);
router.post('/decrease',dec_cart_product);
router.post('/delete',delete_cart_product);

module.exports = router
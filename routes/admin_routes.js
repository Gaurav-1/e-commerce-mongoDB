const express = require('express');
const router = express.Router();


const {
    show_dashboard,
    send_products,
    update_product,
    show_add_product,
    add_product,
    delete_product,
} = require('../controllers/admin_controller')

router.route('/dashboard')
.get(show_dashboard)
.post(send_products)

router.post('/update_product',update_product);

router.route('/add_product')
.get(show_add_product)
.post(add_product)

router.delete('/delete',delete_product);

module.exports = router;
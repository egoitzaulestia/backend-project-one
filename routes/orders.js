const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.get('/orders-with-products', OrderController.getOrdersWithProducts);
router.post('/', OrderController.createOrder);

module.exports = router;
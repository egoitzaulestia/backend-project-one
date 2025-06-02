const express = require('express');
const router = express.Router();
const { createOrder, getOrdersWithProducts } = require('../controllers/OrderController');

router.get('/', getOrdersWithProducts);
router.post('/', createOrder);

module.exports = router;
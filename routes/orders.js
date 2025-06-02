const express = require('express');
const router = express.Router();
const { getOrdersWithProducts } = require('../controllers/OrderController');

router.get('/', getOrdersWithProducts);

module.exports = router;
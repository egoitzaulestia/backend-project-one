const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.use('/', ReviewController.create);

module.exports = router;

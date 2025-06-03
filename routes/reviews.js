const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { authentication } = require('../middlewares/authentication');

// router.use('/', authentication, ReviewController.create);
router.use('/', authentication, ReviewController.create);

module.exports = router;

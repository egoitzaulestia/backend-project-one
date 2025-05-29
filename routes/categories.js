const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.insert);
router.get('/', CategoryController.getAll);

module.exports = router;

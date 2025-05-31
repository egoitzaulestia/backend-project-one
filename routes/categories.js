const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.insert);
router.get('/', CategoryController.getAll);
router.get('/only', CategoryController.getAllAlone);
router.get('/id/:id', CategoryController.getById);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports = router;

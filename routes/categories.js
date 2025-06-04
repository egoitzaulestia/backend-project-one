const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { authentication, isAdmin } = require('../middlewares/authentication');
const fakeAdmin = require('../middlewares/fakeAdmin');

// router.post("/", CategoryController.insert);
router.post('/', fakeAdmin, isAdmin, CategoryController.insert);
router.get('/', CategoryController.getAll);
router.get('/only', CategoryController.getAllAlone);
router.get('/id/:id', CategoryController.getById);
router.get('/name/:name', CategoryController.getOneByName);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports = router;

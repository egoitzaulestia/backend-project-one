const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
// const upload = require('../middlewares/upload');
const { authentication, isAdmin } = require('../middlewares/authentication');

router.post('/', authentication, isAdmin, ProductController.insert);
router.put('/id/:id', authentication, isAdmin, ProductController.update);
router.delete('/id/:id', authentication, isAdmin, ProductController.delete);
router.get('/', ProductController.getAll);
router.get('/id/:id', ProductController.getById);
router.get('/name/:name', ProductController.getByName);
router.get('/price/:price', ProductController.getByPrice);
router.get('/ordered-by-price', ProductController.getByOrderedPrice);

module.exports = router;

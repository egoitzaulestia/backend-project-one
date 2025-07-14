const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middlewares/authentication');
const UserController = require('../controllers/UserController');

router.post('/', UserController.create);
router.get('/confirm/:emailToken', UserController.confirm);
router.post('/login', UserController.login);
router.delete('/logout', authentication, UserController.logout);
router.get('/id/:id', authentication, UserController.getById);
router.get('/info', authentication, UserController.getInfo);
router.get(
  '/logged-user-with-orders',
  authentication,
  UserController.loggedUserWithOrders,
);

module.exports = router;

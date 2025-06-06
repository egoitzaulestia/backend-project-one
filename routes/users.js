const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');

router.post('/createUser', UserController.createUser);
router.get('/confirm/:emailToken', UserController.confirm);
router.post('/login', UserController.login);
router.delete('/logout', authentication, UserController.logout);
router.get(
  '/loggedUserWithOrders',
  authentication,
  UserController.loggedUserWithOrders,
);

module.exports = router;

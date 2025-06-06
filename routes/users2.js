const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middlewares/authentication');

const UserController2 = require('../controllers/UserController2');

router.post('/', UserController2.create);
router.get('/confirm/:emailToken', UserController2.confirm);
router.post('/login', UserController2.login);
router.delete('/logout', authentication, UserController2.logout);
router.get('/id/:id', authentication, UserController2.getById);

module.exports = router;

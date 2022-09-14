const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

// Path /admin/user

router.get('/login', userController.loginView);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/Home');

router.get('/', homeController.index);

module.exports = router;

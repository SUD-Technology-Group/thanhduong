const express = require('express');
const router = express.Router();
const { saleController } = require('../controllers');

router.get('/', saleController.index);

module.exports = router;

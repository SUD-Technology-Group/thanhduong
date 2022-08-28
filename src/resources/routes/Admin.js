const express = require('express');
const router = express.Router();
const productRouter = require('./Product');
const newRouter = require('./New');

// Controller
const { adminController } = require('../controllers');

// Home
router.get('/', adminController.index);

// Product
router.use('/products', productRouter);

// New
router.use('/news', newRouter);

module.exports = router;

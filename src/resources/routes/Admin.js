const express = require('express');
const router = express.Router();
const productRouter = require('./Product');
const newRouter = require('./New');
const categoryRouter = require('./Category');
const orderRouter = require('./Order');

// Controller
const { adminController } = require('../controllers');

// Path /admin

// Home
router.get('/', adminController.index);

// Order
router.use('/orders', orderRouter);

// Product
router.use('/products', productRouter);

// Category
router.use('/categories', categoryRouter);

// New
router.use('/news', newRouter);

module.exports = router;

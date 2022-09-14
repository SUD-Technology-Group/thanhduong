const express = require('express');
const router = express.Router();
const productRouter = require('./Product');
const newRouter = require('./New');
const categoryRouter = require('./Category');
const orderRouter = require('./Order');
const userRouter = require('./User');
const isLoggedIn = require('../middlewares/isLoggedIn');

// Controller
const { adminController } = require('../controllers');

// Path /admin

// Home
router.get('/', isLoggedIn, adminController.index);

// Login
router.use('/user', userRouter);

// Order
router.use('/orders', isLoggedIn, orderRouter);

// Product
router.use('/products', isLoggedIn, productRouter);

// Category
router.use('/categories', isLoggedIn, categoryRouter);

// New
router.use('/news', isLoggedIn, newRouter);

module.exports = router;

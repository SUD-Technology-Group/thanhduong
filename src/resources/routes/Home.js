const express = require('express');
const router = express.Router();
const {
    homeController,
    aboutController,
    productController,
    newController,
    contactController,
    cartController,
    saleController,
    orderController,
} = require('../controllers');

// Path /

router.get('/', homeController.index);
router.get('/about', aboutController.index);

router.get('/products', productController.index);
router.get('/products/:id', productController.detail);

router.get('/news', newController.index);
router.get('/news/:id', newController.detail);

router.get('/contact', contactController.index);

router.get('/sales', saleController.index);

router.get('/cart', cartController.index);
router.post('/cart', orderController.create);

module.exports = router;

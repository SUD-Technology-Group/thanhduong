const express = require('express');
const router = express.Router();
const {
    pagesController,
    productController,
    newController,
    orderController,
} = require('../controllers');

// Path /

router.get('/', pagesController.index);
router.get('/about', pagesController.about);

router.get('/products', productController.index);
router.get('/products/:id', productController.detail);

router.get('/news', newController.index);
router.get('/news/:id', newController.detail);

router.get('/contact', pagesController.contact);

router.get('/sales', pagesController.sale);

router.get('/cart', pagesController.cart);
router.post('/cart', orderController.create);

module.exports = router;

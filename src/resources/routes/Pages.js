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
router.get('/sales', pagesController.sale);
router.get('/cart', pagesController.cart);

router.get('/contact', pagesController.contactView);
router.post('/contact', pagesController.contact);

router.get('/products', productController.index);

router.get('/news', newController.index);
router.get('/news/:id', newController.detail);

router.post('/cart', orderController.create);

router.get('/:category', productController.getByCategory);
router.get('/:category/:slug', productController.detail);

module.exports = router;

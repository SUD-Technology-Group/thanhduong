const express = require('express');
const router = express.Router();
const {
    homeController,
    aboutController,
    productController,
    newController,
    contactController,
    saleController,
} = require('../controllers');

router.get('/', homeController.index);
router.get('/about', aboutController.index);
router.get('/products', productController.index);
router.get('/products/:id', productController.detail);
router.get('/news', newController.index);
router.get('/news/:id', newController.detail);
router.get('/contact', contactController.index);
router.get('/sales', saleController.index);
router.get('/sales/:slug', saleController.detail);

module.exports = router;

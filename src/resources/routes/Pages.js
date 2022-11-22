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

router.get('/gioi-thieu', pagesController.about);
router.get('/uu-dai', pagesController.sale);
router.get('/gio-hang', pagesController.cart);

router.get('/lien-he', pagesController.contactView);
router.post('/lien-he', pagesController.contact);

router.get('/san-pham', productController.index);

router.get('/tin-tuc', newController.index);
router.get('/tin-tuc/:id', newController.detail);

router.post('/gio-hang', orderController.create);

router.get('/:category', productController.getByCategory);
router.get('/:category/:slug', productController.detail);

module.exports = router;

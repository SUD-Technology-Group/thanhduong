const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFlie');

// Controller
const { adminController, productController } = require('../controllers');

// Home
router.get('/', adminController.index);

// // Product
router.get('/products', productController.getAll);
router.get('/products/create', productController.createView);
router.post('/products/create', upload.array('product-imgs', 4), productController.create);
router.get('/products/update/:id', productController.updateView);
router.post('/products/update', upload.array('product-imgs', 4), productController.update);
router.get('/products/delete/:id', productController.delete);

// New

module.exports = router;

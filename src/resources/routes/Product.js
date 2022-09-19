const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFlie');

const { productController } = require('../controllers');

// Path /admin/products

router.get('/', productController.getAll);
router.get('/demo/:id', productController.demo);
router.get('/create', productController.createView);
router.post('/create', upload.array('product-imgs', 12), productController.create);
router.get('/update/:id', productController.updateView);
router.post('/update/:id', upload.array('product-imgs', 12), productController.update);
router.get('/delete/:id', productController.delete);

module.exports = router;

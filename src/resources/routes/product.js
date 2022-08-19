const express = require('express');
const router = express.Router();
const productController = require('../app/controller/ProductController');

router.get('/', productController.show);
router.get('/:id', productController.detail);

module.exports = router;

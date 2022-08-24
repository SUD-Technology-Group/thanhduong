const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product');

router.get('/', productController.index);
router.get('/:id', productController.detail);

module.exports = router;

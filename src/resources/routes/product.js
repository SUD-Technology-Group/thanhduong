const express = require('express');
const router = express.Router();
const { productController } = require('../controllers');

router.get('/', productController.index);
router.get('/:id', productController.detail);

module.exports = router;

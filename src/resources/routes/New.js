const express = require('express');
const router = express.Router();
const { newController } = require('../controllers');

router.get('/', newController.index);
router.get('/:id', newController.detail);

module.exports = router;

const express = require('express');
const router = express.Router();
const { newController } = require('../controllers');

router.get('/', newController.index);

module.exports = router;

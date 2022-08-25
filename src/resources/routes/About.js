const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/About');

router.get('/', aboutController.index);

module.exports = router;

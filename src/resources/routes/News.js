const express = require('express');
const router = express.Router();
const newsController = require('../controllers/News');

router.get('/', newsController.index);

module.exports = router;

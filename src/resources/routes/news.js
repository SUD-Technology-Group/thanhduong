const express = require('express');
const router = express.Router();
const newsController = require('../app/controller/NewsController');

router.get('/', newsController.show);

module.exports = router;

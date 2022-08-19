const express = require('express');
const router = express.Router();
const introductionController = require('../app/controller/IntroductionController');

router.get('/', introductionController.show);

module.exports = router;

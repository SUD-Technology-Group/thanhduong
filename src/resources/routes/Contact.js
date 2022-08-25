const express = require('express');
const router = express.Router();
const contactController = require('../controllers/Contact');

router.get('/', contactController.index);

module.exports = router;

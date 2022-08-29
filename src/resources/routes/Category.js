const express = require('express');
const router = express.Router();

const { categoryController } = require('../controllers');

router.get('/', categoryController.getAll);
router.get('/create', categoryController.createView);
router.post('/create', categoryController.create);
router.get('/update/:id', categoryController.updateView);
router.post('/update/:id', categoryController.update);
router.get('/delete/:id', categoryController.delete);

module.exports = router;

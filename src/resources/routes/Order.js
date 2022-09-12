const express = require('express');
const router = express.Router();

const { orderController } = require('../controllers');

// Path /admin/orders

router.get('/', orderController.getAll);
router.post('/create', orderController.create);
router.get('/demo/:id', orderController.demo);
router.get('/update/:id', orderController.updateView);
router.post('/update/:id', orderController.update);
router.get('/delete/:id', orderController.delete);

module.exports = router;

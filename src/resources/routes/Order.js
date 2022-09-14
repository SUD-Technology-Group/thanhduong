const express = require('express');
const router = express.Router();

const { orderController } = require('../controllers');

// Path /admin/orders

router.get('/', orderController.getAll);
router.get('/log', orderController.log);
router.post('/create', orderController.create);
router.get('/demo/:id', orderController.demo);
router.get('/update/:id', orderController.updateView);
router.post('/update/:id', orderController.update);
router.get('/cancel/:id', orderController.cancel);

module.exports = router;

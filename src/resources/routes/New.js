const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFlie');

const { newController } = require('../controllers');

// Path /admin/news

router.get('/', newController.getAll);
router.get('/demo/:id', newController.demo);
router.get('/create', newController.createView);
router.post('/create', upload.single('new-imgs'), newController.create);
router.get('/update/:id', newController.updateView);
router.post('/update/:id', upload.single('new-imgs'), newController.update);
router.get('/delete/:id', newController.delete);

module.exports = router;

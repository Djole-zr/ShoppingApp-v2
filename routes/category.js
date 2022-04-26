const express = require('express');

const categoryController = require('../controllers/category')

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.showCategory);
router.post('/', categoryController.addCategory);

module.exports = router;
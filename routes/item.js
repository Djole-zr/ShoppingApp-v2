const express = require('express');

const itemController = require('../controllers/item')

const router = express.Router();


router.get('/:id', itemController.showItem);
router.patch('/:id', itemController.editItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
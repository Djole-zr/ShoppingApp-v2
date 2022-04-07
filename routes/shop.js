const express = require('express');

const shopController = require('../controllers/shop')

const router = express.Router();


router.get('/:id', shopController.showShop);
router.post('/', shopController.addShop);

module.exports = router;
const express = require('express');

const listController = require('../controllers/list')

const router = express.Router();


router.get('/', listController.getLists);

router.post('/', listController.createList);

router.get('/:id', listController.showList);

router.post('/:id/items/new', listController.addItem);

module.exports = router;



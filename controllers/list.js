const mongoose = require('mongoose');
const { List, Item } = require('../models/allModels');


main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}

exports.getLists = async (req, res, next) => {
    await List.find({}).populate('shop')
    .then(list => {
      if(!list) {
        const error = new Error('Could not find list.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({message: 'lists found', list: list});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
};

exports.createList = async (req, res, next) => {
    const newList = new List(req.body);
    await newList.save().then(result => {
      res.status(201).json({
        message: "List created successfully.",
        list: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.showList = async (req, res, next) => {
  const { id } = req.params;
  await List.findById(id).populate('items').populate('shop')
  .then(list => {
    if(!list) {
      const error = new Error('Could not find list.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({message: 'list found', list: list});
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })

}

exports.addItem = async (req, res, next) => {
  const { id } = req.params;
  const list = await List.findById(id);
  const newItem = new Item(req.body);
  list.items.push(newItem);
  await list.save();
  await newItem.save().then(result => {
    res.status(201).json({
      message: "Item added successfully.",
      item: result
    })
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
}
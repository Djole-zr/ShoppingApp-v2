const mongoose = require('mongoose');
const { Item } = require('../models/allModels');


main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}

exports.showItem = async (req, res, next) => {
    const { id } = req.params;
    await Item.findById(id).populate('category')
    .then(item => {
      if(!item) {
        const error = new Error('Could not find item.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({message: 'item found', item: item});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
  
  }

  exports.editItem = async (req, res, next) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { runValidators: true});
    item.save().then(result => {
        res.status(201).json({
          message: "Item updated successfully.",
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


  exports.deleteItem = async (req, res, next) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id).then(result => {
        res.status(201).json({
          message: "Item deleted successfully.",
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
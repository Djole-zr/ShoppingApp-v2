const mongoose = require('mongoose');
const { Category } = require('../models/allModels');


main().catch(err => console.log(err, 'ne radi'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shoppingList');
}

exports.showCategory = async (req, res, next) => {
    const { id } = req.params;
    await Category.findById(id)
    .then(category => {
      if(!category) {
        const error = new Error('Could not find category.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({message: 'category found', category: category});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
  
  }

  exports.addCategory = async (req, res, next) => {
    const newCategory = new Category(req.body);
    await newCategory.save().then(result => {
      res.status(201).json({
        message: "Category added successfully.",
        category: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
  }
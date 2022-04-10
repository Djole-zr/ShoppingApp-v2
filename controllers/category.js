const Category = require('../models/category');

exports.showCategory = async (req, res, next) => {
    const { id } = req.params;
    await Category.findById(id)
    .then(category => {
      res.status(200).json({message: 'Category found', category: category});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 404;
      }
      err.message = 'Could not find category.';
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
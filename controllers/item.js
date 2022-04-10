const Item = require('../models/item');

exports.showItem = async (req, res, next) => {
    const { id } = req.params;
    await Item.findById(id).populate('category')
    .then(item => {
      res.status(200).json({message: 'item found', item: item});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 404;
      }
      err.message = 'Could not find item.';
      next(err);
    })
  
  }

  exports.editItem = async (req, res, next) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { runValidators: true});
    item.save()
    .then(result => {
        res.status(200).json({
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
    await Item.findByIdAndDelete(id)
    .then(result => {
        res.status(200).json({
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
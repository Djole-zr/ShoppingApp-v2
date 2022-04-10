const Shop = require('../models/shop');


exports.showShop = async (req, res, next) => {
    const { id } = req.params;
    await Shop.findById(id)
    .then(shop => {
      if(!shop) {
        const error = new Error('Could not find shop.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({message: 'Shop found', shop: shop});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
  
  }

  exports.addShop = async (req, res, next) => {
    const newShop = new Shop(req.body);
    await newShop.save().then(result => {
      res.status(201).json({
        message: "Shop added successfully.",
        shop: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
  }
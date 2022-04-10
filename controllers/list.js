const Item = require('../models/item');
const List = require('../models/list');

exports.getLists = async (req, res, next) => {
    await List.find({}).populate('shop')
    .then(list => {
      if(list.length === 0){
        const nlError = new Error('No lists yet');
        nlError.statusCode = 404;
        next(nlError);
      } else {
        res.status(200).json({message: 'Lists found', list: list});
      }  
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 404;
      }
      err.message = 'Could not find lists';
      next(err);
    })
};

exports.createList = async (req, res, next) => {
    const newList = new List(req.body);
    await newList.save()
    .then(result => {
      res.status(201).json({
        message: 'List created successfully.',
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
    res.status(200).json({message: 'List found', list: list});
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 404;
    }
    err.message = 'Could not find list.';
    next(err);
  })

}

exports.addItem = async (req, res, next) => {
  const { id } = req.params;
  const list = await List.findById(id);
  const newItem = new Item(req.body);
  list.items.push(newItem);
  await list.save();
  await newItem.save()
  .then(result => {
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
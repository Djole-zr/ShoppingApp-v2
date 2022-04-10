const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity required']
    },
    created: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: [true, 'Category required']
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
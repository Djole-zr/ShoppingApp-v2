const mongoose = require('mongoose');
const { Schema } = mongoose;


const shopSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    address: {
        type: String,
        required: [true, 'Address required']
    },
    city: {
        type: String,
        required: [true, 'City required']
    }

})

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
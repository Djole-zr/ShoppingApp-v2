const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    description: {
        type: String,
        required: [true, 'Description required']
    }

})


const Category = mongoose.model('Category', categorySchema);


module.exports = Category;
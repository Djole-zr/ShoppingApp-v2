const mongoose = require('mongoose');
const { Schema } = mongoose;


const listSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: [true, 'Shop required']
    },
    items: [{
        type: Schema.Types.ObjectId, 
        ref: 'Item'
    }]
},
{
    timestamps: true
}
)

const List = mongoose.model('List', listSchema);

module.exports = List;
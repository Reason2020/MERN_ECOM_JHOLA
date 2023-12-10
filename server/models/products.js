const mongoose = require('mongoose');

//what should be in a product
/*
    name,
    price,
    image(will work on little later),
    description,

*/

//TODO: Update the schema as needed later
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
}, {timestamps: true});

//model
const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;


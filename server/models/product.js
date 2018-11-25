const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product_Schema = new Schema({
    id: {
        type: Number,
        min: 1,
        required: true
    },
    name: {
        type: String,
        minlength: 2, 
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        required: true
    }
});

exports.Product = mongoose.model('Product' , Product_Schema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    quantity: Number,
    price: Number
});

exports.Product = mongoose.model('Product', ProductSchema);
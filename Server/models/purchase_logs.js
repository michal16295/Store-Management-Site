const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PurchasLogsSchema = new Schema({
    price: {
        type: Number,
        min: 0,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    direction: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    }

});

exports.PurchasLogs = mongoose.model('PurchasLogs' , PurchasLogsSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Purchase_Log_Schema = new Schema({
    id: {
        type: Number,
        min: 1,
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
        type: Boolean,
        required: true
    }

});

exports.Purchase_Log = mongoose.model('Purchase_Log ' , Purchase_Log_Schema);
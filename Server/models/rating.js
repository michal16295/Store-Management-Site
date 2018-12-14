const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingsSchema = new Schema({

    worker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
exports.Ratings= mongoose.model('Ratings' , RatingsSchema);
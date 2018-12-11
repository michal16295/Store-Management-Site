const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Ratings_Schema = new Schema({
    id: {
        type: Number,
        min: 1,
        required: true
    },
    worker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    costumer_id: {
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
exports.Ratings_Schema= mongoose.model('Rating_Schema' , Ratings_Schema);
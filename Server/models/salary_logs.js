const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Salary_Logs_Schema = new Schema({
    id: {
        type: Number,
        min: 1,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    basis: {
        type: Number,
        min: 0,
        required: true
    },
    bonus: {
        type: Number,
        min: 0,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
exports.Salary_Logs_Schema = mongoose.model('Salary_Logs' , Salary_Logs_Schema);
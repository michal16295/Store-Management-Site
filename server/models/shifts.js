const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Shifts_Schema = new Schema({
    id: {
        type: Number,
        min: 1,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    shift: {
        // True - Morning , False - Night
        type: Boolean,
        required: true
    },


});
exports.ShiftsSchema = mongoose.model('Shifts' , Shifts_Schema);
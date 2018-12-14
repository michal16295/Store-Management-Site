const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;
const validShifts = ['morning', 'evening'];

const Shifts_Schema = new Schema({
    date: {
        type: Date,
        required: true
    },
    shift: {
        type: String,
        enum: validShifts,
        required: true
    },
    userName: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: true
    }
});

function validateShift(shift) {
    const schema = {
        date: Joi.date().iso().required(),
        shift: Joi.string().valid(validShifts).required()
    };

    return Joi.validate(shift, schema);
}

exports.validate = validateShift;
exports.Shift = mongoose.model('Shifts', Shifts_Schema);
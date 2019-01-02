const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;
const validShifts = ['morning', 'evening'];

const Shifts_Schema = new Schema({
    userId: {
        type: Number,
        min: 1,
        required: true
    },
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
    const schema = Joi.array().items({
        date: Joi.date().iso().required(),
        shift: Joi.string().valid(validShifts).required()
    });

    return Joi.validate(shift, schema);
}

exports.validate = validateShift;
exports.Shift = mongoose.model('Shifts', Shifts_Schema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Salary_Logs_Schema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    salaryData: {
        type: Object,
        required: true
    },
    month: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    year: {
        type: Number,
        min: 2000,
        max: 2100,
        required: true
    }
});
exports.SalaryLogs = mongoose.model('Salary_Logs' , Salary_Logs_Schema);
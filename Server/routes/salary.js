const { User } = require('../models/users');
const { Shift } = require('../models/shifts');
const { SalaryLogs } = require('../models/salary_logs');
const { Ratings } = require('../models/rating');
const adminOrWorker = require('../middlewares/adminOrWorker');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const utils = require('../common/utils');

router.put("/:id", [auth, adminOrWorker], async(req, res)=>{
    const { error } = validateSalary(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userId = parseInt(req.params.id);
    if (isNaN(userId) || userId <= 0) return res.status(404).send("ID must be a positive number");

    let user = await User.findOne({id: userId, role:"worker"}).select('-password');
    if(!user) return res.status(404).send("The user not found");

    if (!(req.user.role === 'admin' || user.id == req.user.id))
        return res.status(403).send('Access denied');

    let salaryLog = await SalaryLogs.findOne({ user_id: user._id, month: req.body.month, year: req.body.year}).select('-_id salaryData');
    
    if (salaryLog) return res.status(200).send(salaryLog);

    if (!salaryLog && req.user.role !== 'admin') return res.status(404).send('The salary is not ready');

    const endMonth = utils.endMonth(req.body.year, req.body.month - 1);
    const startMonth = utils.startMonth(req.body.year, req.body.month - 1);

    if ((new Date()).valueOf() < endMonth.valueOf())
        return res.status(400).send('The month has not ended yet to create the salary log');

    const shifts = await Shift.find({userId: userId, date: { $lte: endMonth, $gte: startMonth }}).sort('date');
    if (!shifts) return res.status(400).send("Error getting shifts");

    const refs = await User.find({referral: userId, createDate: { $lte: endMonth, $gte: startMonth }});
    if (!refs) return res.status(400).send("Error getting referrals");

    const rates = await Ratings.find({worker_id: user._id, date: { $lte: endMonth, $gte: startMonth }});
    if (!rates) return res.status(400).send("Error getting ratings");

    const basis = 300;
    let ratingBonus = 0;
    let salary = [];
    let total = 0;

    for (let i = 0; i < shifts.length; ++i) {
        let referrals = 0;
        let shift = shifts[i];
        for (let j = 0; j < refs.length; ++j) {
            if (utils.resetTime(refs[j].createDate).valueOf() == utils.resetTime(shift.date).valueOf()) {
                referrals++;
            }
        }
        const s = {
            base: basis,
            date: shift.date,
            bonus: referrals * 100,
            total: basis + referrals * 100
        }
        total += s.total
        salary.push(s);
    }

    let rating = 0;
    if (rates.length >= 10) {
        for (let i = 0; i < rates.length; ++i) {
            rating += rates[i].rating;
        }
        rating /= rates.length;
        if (rating > 4) ratingBonus = 100;
    }

    const response = {
        total,
        ratingBonus,
        salary
    }

    const model = {
        user_id: user._id,
        salaryData: response,
        month: req.body.month,
        year: req.body.year
    }
    await SalaryLogs.create(model);

    return res.status(200).send({salaryData: response}); 
});

function validateSalary(req){
    const schema = {
        month: Joi.number().min(1).max(12).required(),
        year: Joi.number().min(2000).max(2100).required()
    };
    return Joi.validate(req , schema);
}

module.exports = router;
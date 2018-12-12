const { Shift, validate } = require('../models/shifts');
const { User } = require('../models/users');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const adminOrWorker = require('../middlewares/adminOrWorker');
const worker = require('../middlewares/worker');
const express = require('express');
const router = express.Router();
const utils = require('../common/utils');

router.post("/create", [auth, worker], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    req.body.date = utils.resetTime(req.body.date);
    const sunday = utils.getSunday();

    if (req.body.date < sunday) return res.status(400).send("Can't place a shift in the past");

    let shift = await Shift.findOne({ date: { $eq: req.body.date }, shift: req.body.shift });
    if (shift) return res.status(400).send("Shift already taken");

    const user = await User.findOne({ id: req.user.id });
    if (!user) return res.status(400).send("Error finding the user");

    shift = {
        date: req.body.date,
        shift: req.body.shift,
        userName: user.firstName + " " + user.lastName
    }
    
    shift = await Shift.create(shift);
    if (!shift) return res.status(400).send("Error - Shift wasn't placed");

    const response = {
        message: "Shift placed successfully"
    }
    return res.status(200).send(response);
});

router.get("/", [auth, adminOrWorker], async (req, res) => {
    const sunday = utils.getSunday();
    const thursday = utils.getThursday();

    let shifts = await Shift.find({ date: { $gte: sunday, $lte: thursday }});

    if (!shifts) return res.status(400).send("Error - DB error finding shifts");

    return res.status(200).send(shifts);
});

router.delete("/delete/:id", [auth, admin], async (req, res) => {
    let shiftId = parseInt(req.params.id);
    if (isNaN(shiftId) || shiftId <= 0) return res.status(404).send("C/N must be a positive number");
    
    const shift = await Shift.findOne({ _id: req.params.id });
    if (!shift) return res.status(404).send("The shift was not found");

    await Shift.deleteOne(shift);

    const response = {
        message: "Shift deleted successfully"
    }
    return res.status(200).send(response);
});

module.exports = router;
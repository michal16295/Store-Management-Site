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

    const user = await User.findOne({ id: req.user.id });
    if (!user) return res.status(400).send("Error finding the user");

    const keys = req.body;
    const now = utils.resetTime(new Date());
    let updated = 0;
    for (let i = 0; i < keys.length; ++i) {
        const shift = keys[i];

        shift.date = utils.resetTime(shift.date);
        if (shift.date.valueOf() < now.valueOf()) {
            continue;
        }

        let s = await Shift.findOne({ date: shift.date , shift: shift.shift });
        if (s) {
            continue;
        }

        s = {
            shift: shift.shift,
            date: shift.date,
            userName: user.firstName + " " + user.lastName,
            userId: req.user.id
        }

        s = await Shift.create(s);
        if (!s) return res.status(400).send("Error - Shift wasn't placed");

        updated++;
    }
    if(updated == 0) return res.status(400).send("Shifts already placed for the dates");

    const response = {
        message: "Shifts placed successfully"
    }
    return res.status(200).send(response);
});

router.get("/:week", [auth, adminOrWorker], async (req, res) => {
    let week = req.params.week;
    if (!week) week = 0;
    if (isNaN(week)) return res.status(400).send("Bad request - week must be a number");

    const date = new Date();
    date.setDate(date.getDate() + 7 * week);

    const sunday = utils.getSunday(date);
    const thursday = utils.getThursday(date);

    let shifts = await Shift.find({ date: { $gte: sunday, $lte: thursday }});

    if (!shifts) return res.status(400).send("Error - DB error finding shifts");

    return res.status(200).send(shifts);
});

router.delete("/delete/:id", [auth, admin], async (req, res) => {
    let shiftId = req.params.id;
    if (!shiftId) return res.status(404).send("ID must be provided");
    
    const shift = await Shift.findOne({ _id: shiftId });
    if (!shift) return res.status(404).send("The shift was not found");

    const today = utils.resetTime(new Date());
    shift.date = utils.resetTime(shift.date);
    if (shift.date.valueOf() < today.valueOf())
        return res.status(400).send("Error - you can't delete a shift older than today");

    await Shift.deleteOne(shift);

    const response = {
        message: "Shift deleted successfully"
    }
    return res.status(200).send(response);
});

module.exports = router;
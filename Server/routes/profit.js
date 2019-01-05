const { PurchasLogs } = require('../models/purchase_logs');
const admin = require('../middlewares/admin');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.put("/", [auth, admin], async(req, res)=>{
    const { error } = validateProfit(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const startDate = new Date(req.body.startDate);
    startDate.setHours(0,0,0,0);
    const endDate = new Date(req.body.endDate);
    endDate.setHours(23, 59, 59, 999);

    const logs = await PurchasLogs.find({ date: { $lte: endDate, $gte: startDate} })
        .populate('product_id', ['quantity']).select('-_id -__v');

    let totalBuy = 0;
    let totalSell = 0;

    logs.forEach(log => {
        if (log.direction === 'buy') {
            totalBuy += log.price;
        } else {
            totalSell += log.price;
        }
    });

    const data = {
        totalBuy,
        totalSell,
        total: totalSell - totalBuy,
        logs
    }

    return res.status(200).send({profitData: data}); 
});

function validateProfit(req){
    const schema = {
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required()
    };
    return Joi.validate(req , schema);
}

module.exports = router;
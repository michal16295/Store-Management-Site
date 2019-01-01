const { User } = require('../models/users');
const { Ratings } = require('../models/rating');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const customer = require('../middlewares/customer');
const admin = require('../middlewares/admin');
const utils = require('../common/utils');
const Joi = require('joi');

router.post('/new', [auth, customer], async (req, res) => {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const keys = req.body;
    let updated = 0;
    for (let i = 0; i < keys.length; ++i) {
        const rate = keys[i];
        let worker = await User.findOne({ id: rate.id , role: "worker"});
        if (!worker) return res.status(404).send("Worker doesnt exists");
    
        rate.date = utils.resetTime(new Date());
        let rating = await Ratings.findOne({date: rate.date, worker_id: worker._id, customer_id: req.user._id});
        if (rating) {
            continue;
        }
        
        rating = {
            date: utils.resetTime(new Date()),
            worker_id: worker._id,
            customer_id: req.user._id,
            rating: rate.rating
        }
        
        rating = await Ratings.create(rating);
        if (!rating) return res.status(400).send("Error - rating wasn't placed"); 
        
        updated++;
    }
    if(updated == 0) return res.status(400).send("Rating already placed for today");

    const response = {
        message: "Rating placed successfully"
    }
    return res.status(200).send(response);
});

router.get('/', [auth, admin], async(req, res)=>{
    let ratings = await Ratings.aggregate([
        { $group: {
            _id: "$worker_id",
            rating: { $avg: "$rating" },
            worker_id: {$first: "$worker_id"}

        }
    }
    ]);
    
    ratings = await Ratings.populate(ratings,{ path : "worker_id", options:{select: {id: 1, firstName: 1, lastName: 1 }}});
    ratings = ratings.map(rating => {
        return {rating: rating.rating, name:rating.worker_id.firstName + " " + rating.worker_id.lastName, id:rating.worker_id.id}
    });
    if(!ratings) return res.status(404).send("Ratings not found");
    return res.status(200).send(ratings);
});

function Validate(req){
    const schema = Joi.array().items({
            id: Joi.number().min(1).required(),
            rating: Joi.number().min(1).max(5).required()
        });
    return Joi.validate(req , schema);
}
module.exports = router;
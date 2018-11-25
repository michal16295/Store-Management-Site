const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post("/login" , async(req , res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send("Invalid ID or Password");

    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send("Invalid ID or Password");

    const token = user.generateAuthToken();

    res.setHeader('Content-Type' , 'application/json');
    res.json(token);
});

function validate(req){
    const schema = {
        id: Joi.number().requiredd(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req , schema);
}
module.exports = router;
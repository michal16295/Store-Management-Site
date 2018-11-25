const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post("/login" , async(req , res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ id: req.body.id});
    if(!user) return res.status(400).send("Invalid ID or Password");

    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).send("Invalid ID or Password");

    const token = user.generateAuthToken();

    res.setHeader('Content-Type' , 'application/json');
    const response = {
        token: token,
        userId: user._id,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    };
    if (user.role === 'customer') {
        response.points = user.points;
    }
    res.json(response);
});
router.post("/reset" , async(req, res) => {
    const { error } = ValidateResetPassword(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ id: req.body.id});
    if(!user) return res.status(400).send("Invalid ID or Password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid ID or Password");

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(user.password, salt);
    user = await User.findByIdAndUpdate(user._id, {
        password: newPassword
    }, {
        new: true
    });
    if (!user) return res.status(400).send("ERROR - Password Didn't Changed!");
    return res.status(200).send(user);    


});
function ValidateResetPassword(req){
    const schema = {
        id: Joi.number().required(),
        password: Joi.string().min(5).max(255).required(),
        newPassword: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req , schema);
        
}
function validate(req){
    const schema = {
        id: Joi.number().required(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req , schema);
}
module.exports = router;



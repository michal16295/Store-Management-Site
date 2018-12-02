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
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    };
    res.send(response);
});

router.post("/reset" , async(req, res) => {
    const { error } = ValidateResetPassword(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ id: req.body.id});
    if(!user) return res.status(400).send("Invalid ID or Password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid ID or Password");

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.newPassword, salt);

    user = await User.findByIdAndUpdate(user._id, {
        password: newPassword
    }, {
        new: true
    });

    if (!user) return res.status(400).send("ERROR - Password Didn't Changed!");

    const token = user.generateAuthToken();

    res.setHeader('Content-Type' , 'application/json');
    const response = {
        token: token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    };

    return res.status(200).send(response);    


});
router.post("/newCustomer" , async(req, res) => {
    const { error } = ValidateNewUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ id: req.body.id});
    if(user) return res.status(400).send("User already exists");


    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash("123456", salt);

    user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        id: req.body.id,
        password: newPassword
    }
    user = await User.create(user);
    if (!user) return res.status(400).send("ERROR - User wasn't created!");

    const response = {
        message: "User created successfully"
    }
    return res.status(200).send(response);    

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
function ValidateNewUser(req){
    const schema = {
        id: Joi.number().required(),
        firstName: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(10).max(10).required(),
    };
    return Joi.validate(req , schema);
        
}
module.exports = router;
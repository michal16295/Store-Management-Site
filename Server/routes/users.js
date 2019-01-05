const { User } = require('../models/users');
const admin = require('../middlewares/admin');
const adminOrWorker = require('../middlewares/adminOrWorker');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const utils = require('../common/utils');

//Login 
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
        role: user.role,
        points: user.points

    };
    res.send(response);
});
//reset password
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
//creating a new customer
router.post("/newCustomer" ,[auth, adminOrWorker],  async(req, res) => {
    const { error } = ValidateNewUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ id: req.body.id});
    if(user) return res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash("123456", salt);

    const ref = await User.findOne({id: req.body.referral});
    if(!ref) return res.status(404).send("Referral not found");
    if(ref.role === 'customer'){
        await User.updateOne({id: req.body.referral}, {
            $inc: {
                points: 100
            }
        });
    }
    user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        id: req.body.id,
        password: newPassword,
        points: 500,
        referral: req.body.referral

    }
    user = await User.create(user);
    if (!user) return res.status(400).send("ERROR - User wasn't created!");

    const response = {
        message: "User created successfully"
    }
    return res.status(200).send(response);    
});
//creating a new worker
router.post("/newWorker" ,[auth, admin], async(req, res) => {
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
        password: newPassword,
        role: 'worker',
        referral: 1
    }
    user = await User.create(user);
    if (!user) return res.status(400).send("ERROR - User wasn't created!");

    const response = {
        message: "User created successfully"
    }
    return res.status(200).send(response);
});
//deleting a user by id
router.delete("/:id", [auth, admin], async(req, res)=>{
    let userId = parseInt(req.params.id);
    if (isNaN(userId) || userId <= 0) return res.status(404).send("ID must be a positive number");
    
    const user = await User.findOne({id: userId, role: "worker"});
    if(!user) return res.status(404).send("The user not found");
    await User.deleteOne(user);
    const response = {
        message: "User deleted successfully"
    }

    return res.status(200).send(response); 
});
//Updating data of a given user 
router.put("/update/:id",[auth], async(req, res)=>{
    let userId = parseInt(req.params.id);
    if (isNaN(userId) || userId <= 0) return res.status(404).send("ID must be a positive number");
    
    const { error } = ValidateUpdate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({id: userId});
    if(!user) return res.status(404).send("The user not found");

    let objForUpdate = {};

    if (req.body.firstName !== '') objForUpdate.firstName = req.body.firstName;
    if (req.body.lastName !== '') objForUpdate.lastName = req.body.lastName;
    if (req.body.phone !== '') objForUpdate.phone = req.body.phone;

    await User.updateOne({id: userId}, {
        $set: objForUpdate
    });
    
    const response = {
        message: "User updated successfully"
    }

    return res.status(200).send(response); 
});
//Workers list
router.get("/", [auth], async(req, res)=>{
    const users = await User.find({role: "worker"}).select('-_id -__v -password -role');

    if(!users) return res.status(404).send("Error finding workers");

    return res.status(200).send(users);
});
//Customers List
router.get("/customers", [auth], async(req, res)=>{
    const users = await User.find({role: "customer"}).select('-_id -__v -password -role');

    if(!users) return res.status(404).send("Error finding customers");

    return res.status(200).send(users);
});
//finding a single worker by id
router.get("/:id", [auth], async(req, res)=>{
    let userId = parseInt(req.params.id);
    if (isNaN(userId) || userId <= 0) return res.status(404).send("ID must be a positive number");
    let user = await User.findOne({id: userId}).select('-_id -password');
    if(!user) return res.status(404).send("The user not found");
    return res.status(200).send(user); 
});
//finding a single customer by id
router.get("/customer/:id", [auth, adminOrWorker], async(req, res)=>{
    let userId = parseInt(req.params.id);
    if (isNaN(userId) || userId <= 0) return res.status(404).send("ID must be a positive number");
    let customer = await User.findOne({id: userId, role:"customer"}).select('-_id -password');
    if(!customer) return res.status(404).send("The customer not found");
    return res.status(200).send(customer); 
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
        id: Joi.number().min(1).required(),
        firstName: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(10).max(10).regex(/^\d+$/).required(),
        referral: Joi.number().min(1).required()
    };
    return Joi.validate(req , schema);
}

function ValidateUpdate(req) {
    let firstNameCheck = Joi.string().min(3).max(255).required();
    let lastNameCheck = Joi.string().min(3).max(255).required();
    let phoneCheck =Joi.string().min(10).max(10).regex(/^\d+$/).required();
    if (req.firstName === '')
        firstNameCheck = Joi.string().allow('').optional();
    if (req.lastName === '')
        lastNameCheck = Joi.string().allow('').optional();
    if (req.phone === '')
        phoneCheck = Joi.string().allow('').optional();
    const schema = {
        firstName: firstNameCheck,
        lastName: lastNameCheck,
        phone: phoneCheck
    };
    return Joi.validate(req, schema);
}

module.exports = router;
const { User } = require('../models/users');
const worker = require('../middlewares/worker');
const admin = require('../middlewares/admin');
const adminOrWorker = require('../middlewares/adminOrWorker');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

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
router.post("/newCustomer" ,[auth, adminOrWorker],  async(req, res) => {
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
        role: 'worker'
    }
    user = await User.create(user);
    if (!user) return res.status(400).send("ERROR - User wasn't created!");

    const response = {
        message: "User created successfully"
    }
    return res.status(200).send(response);    

});
router.delete("/:id", [auth, admin], async(req, res)=>{
    console.log("in delete");
    const user = await User.find({id: id, role: "worker"});
    console.log(user);
    if(!user) return res.status(404).send("The user not found");
    await User.remove(user);
    const response = {
        message: "User deleted successfully"
    }
    console.log(response);
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
const express = require('express');
const mongoose = require('mongoose');
const users = require('../routes/users');
const products = require('../routes/products');
const shifts = require('../routes/shifts');

// Secret Key
const secretKey = () => {
    return "atmd";
}

// Set routes
const setRoutes = (app) => {
    app.use(express.json());
    app.use('/users', users);
    app.use('/products', products);
    app.use('/shifts', shifts);
}

// Connect to Database
const connectToDB = () => {
    mongoose.connect('mongodb://atmd_project:atmd1234@cluster0-shard-00-00-mh9ef.mongodb.net:27017,cluster0-shard-00-01-mh9ef.mongodb.net:27017,cluster0-shard-00-02-mh9ef.mongodb.net:27017/atmd?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
}

module.exports.setRoutes = setRoutes;
module.exports.connectToDB = connectToDB;
module.exports.secretKey = secretKey;
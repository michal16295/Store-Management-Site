const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://atmd_project:atmd1234@cluster0-shard-00-00-mh9ef.mongodb.net:27017,cluster0-shard-00-01-mh9ef.mongodb.net:27017,cluster0-shard-00-02-mh9ef.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
// Connect


const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require('express');
const bcrypt = require('bcrypt');
const config = require('./Server/config/config');

const app = express();
const port = process.env.PORT || 5000;

// Config server
config.setRoutes(app);
config.connectToDB();

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));

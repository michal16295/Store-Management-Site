const express = require('express');
const bcrypt = require('bcrypt');
const config = require('./server/config/config');

const app = express();
const port = process.env.PORT || 5000;

// Setting up server
config.setRoutes(app);
config.connectToDB();

async function password() {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash("1234567", salt);
    console.log(newPassword);
}

password();

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require('express');
const config = require('./server/config/config');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Setting up server
config.setRoutes(app);
config.connectToDB();

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
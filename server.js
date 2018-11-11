const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7265004',
  password: 'L5XmtVVk2f',
  database: 'sql7265004'
});

// Connect

db.connect(err => {
  if (err) {
    console.log(err);
  }
  console.log('MySql Connected...');
});
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    res.send(`The solution is: ${results[0].solution}`);
  });
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});

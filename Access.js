let mysql = require('mysql');

// Create a connection to the database

let Access = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

Access.connect();

module.exports = Access;
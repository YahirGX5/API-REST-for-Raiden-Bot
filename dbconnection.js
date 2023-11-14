const mysql2 = require('mysql2');
require('dotenv').config();

const Connection = mysql2.createConnection({
    host: process.env.HOST_DATABASE,
    port: process.env.PORT,
    user: process.env.USER_DATABASE,
    database: process.env.DATABASE,
    password: process.env.PASSWORD_DATABASE
});

module.exports = { Connection };
const mysql2 = require('mysql2/promise');
require('dotenv').config();



const connection = await mysql2.createConnection({
    host: process.env.HOST_DATABASE,
    port: process.env.PORT,
    user: process.env.USER_DATABASE,
    database: process.env.DATABASE,
    password: process.env.PASSWORD_DATABASE
});




module.exports = { connection }
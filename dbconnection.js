const mysql2 = require('mysql2');
require('dotenv').config();



const pool = mysql2.createPool({
    connectionLimit: 10,
    host: process.env.HOST_DATABASE, 
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE, 
    database: process.env.DATABASE,
    port: process.env.PORT,
    maxIdle: 10,
    queueLimit: 0,

})

const promisePool = pool.promise();


module.exports = { promisePool }
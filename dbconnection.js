const mysql2 = require('mysql2');
require('dotenv').config();


try {
    const connection = mysql2.createConnection({
        host: process.env.HOST_DATABASE,
        port: process.env.PORT,
        user: process.env.USER_DATABASE,
        database: process.env.DATABASE,
        password: process.env.PASSWORD_DATABASE
    });

} catch (error) {

    console.log(`Error al conectar a la db: \n ${error}`);

}


module.exports = { connection }
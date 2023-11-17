const express = require('express');
const database = require('./dbconnection.js');
const app = express();

app.disable('x-powered-by');


//Cuando obtenga un get en la ruta '/users'
app.get('/get-users', (req, res) => {
    try {

        let users;
        database.execute('SELECT `user_name` FROM users;', (error, results) => {
            if (error) throw error;
            users = results;
        });

        res.json(users);

    } catch (error) {

        res.status(500).send('<h1> Internal Server Error <h1>');

    }
    
});


app.use((req, res) => {
    res.send('<h1> 404 NOT FOUND <h1>');
});
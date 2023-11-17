const express = require('express');
const promisePool = require('./dbconnection.js');
const app = express();

app.disable('x-powered-by');


//Cuando obtenga un get en la ruta '/users'
app.get('/users', async (req, res) => {
    try {

        const [users] = await promisePool.query('SELECT `user_name` FROM users;');

        res.json(users);

    } catch (error) {

        res.status(500).send('<h1> Internal Server Error <h1>');

    }
    
});


app.use((req, res) => {
    res.send('<h1> 404 NOT FOUND <h1>');
});
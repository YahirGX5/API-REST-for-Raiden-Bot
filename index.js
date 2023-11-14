const express = require('express');
const database = require('./dbconnection.js');
const app = express();

app.disable('x-powered-by');


//Cuando obtenga un get en la ruta
app.get('/getusers', (req, res) => {
    let users = database.execute(`SELECT user FROM users;`);
    
});


app.use((req, res) => {
    res.send('<h1> 404 NOT FOUND <h1>');
})
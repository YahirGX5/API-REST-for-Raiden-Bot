const express = require('express');
const { promisePool } = require('./dbconnection.js');
const app = express();

app.disable('x-powered-by');


//Cuando obtenga un get en la ruta '/users'
app.get('/users', async (req, res) => {
    try {

        const [users] = await promisePool.query('SELECT `user_name` FROM users;');

        res.json(users);

    } catch (error) {

        res.status(500).send(`<h1> Internal Server Error <h1> el error es este ${error}`);

    }
    
});


app.use((req, res) => {
    res.send('<h1> 404 NOT FOUND <h1>');
});


app.listen(1234, () => {
    console.log(`server listening on port http://localhost:${1234}`);
})
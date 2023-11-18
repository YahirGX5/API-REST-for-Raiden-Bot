const express = require('express');
const { promisePool } = require('./dbconnection.js');
const app = express();

app.disable('x-powered-by');
app.use(express.json());

//Cuando obtenga un get en la ruta '/users'
app.get('/users', async (req, res) => {
    try {

        const [users] = await promisePool.query('SELECT `user_name` FROM users;');

        res.json(users);

    } catch (error) {

        res.status(500).send(`<h1> Internal Server Error <h1> el error es este ${error}`);

    }
    
});


app.post('/users', async (req, res) => {
    try {

        const { user_discord_id, user_name, points, level_of_user } = req.body;
        await promisePool.query('INSERT INTO users (user_discord_id, user_name, points, level_of_user) VALUES (?, ?, ?, ?)', [user_discord_id, user_name, points, level_of_user]);
        res.send('<h1> User added succesfully! <h1>');

    } catch (error) {
        res.status(500).send(`<h1> Internal Server Error <h1> ${error}`);
    }
});

app.use((req, res) => {
    res.send('<h1> 404 NOT FOUND <h1>');
});


app.listen(1234, () => {
    console.log(`server listening on port http://localhost:${1234}`);
})
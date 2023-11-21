const express = require('express');
const { promisePool } = require('./dbconnection.js');
const app = express();

app.disable('x-powered-by');
app.use(express.json());

//Cuando obtenga un GET en la ruta '/users'
app.get('/users', async (req, res) => {
    try {

        const [users] = await promisePool.query('SELECT `user_name` FROM users;');

        res.json(users);

    } catch (error) {

        res.status(500).send(`<h1> Internal Server Error <h1> el error es este ${error}`);

    }
    
});


//Cuando obtenga un DELETE en la ruta '/users'
app.delete('/users', async (req, res) => {

    try {
        const { user_discord_id } = req.body;
        await promisePool.query('DELETE FROM users WHERE user_discord_id = ?;', [user_discord_id]);
        res.send('<h1> Todo bien pibe 😁 <h1>');
    } catch (error) {
        res.status(500).send(`<h1> Internal Server Error <h1> ${error}`);
    }
    
});


// Cuando tengamos un POST en la ruta '/users'
app.post('/users', async (req, res) => {
    try {

        const { user_discord_id, user_name, points, level_of_user } = req.body;
        await promisePool.query('INSERT INTO users (user_discord_id, user_name, points, level_of_user) VALUES (?, ?, ?, ?)', [user_discord_id, user_name, points, level_of_user]);
        res.send('<h1> User added succesfully! <h1>');

    } catch (error) {
        res.status(500).send(`<h1> Internal Server Error <h1> ${error}`);
    }
});


//En caso de no obtener ninguna request como las anteriores, mandamos este mensaje
app.use((req, res) => {
    res.send('<h1> 404 NOT FOUND <h1>');
});


//Iniciamos el listener del servidor
app.listen(1234, () => {
    console.log(`server listening on port http://localhost:${1234}`);
})
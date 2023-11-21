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

        res.status(500).json({"message": "Error al obtener los usuarios", "Error": error});
                              
    }
    
});


//Cuando obtenga un DELETE en la ruta '/users'
app.delete('/users', async (req, res) => {

    try {
        const { user_discord_id } = req.body;
        await promisePool.query('DELETE FROM users WHERE user_discord_id = ?;', [user_discord_id]);
        res.json({"message": "Todo bien pibe, he borrado el usuario 😁"});
    } catch (error) {
        res.status(500).json({"message": "Error al borrar usuarios", "Error": error});
    }
    
});


//Cuando obtengamos un PUT en la ruta '/users'
app.put('/users', async (req, res) => {

});

// Cuando tengamos un POST en la ruta '/users'
app.post('/users', async (req, res) => {
    try {

        const { user_discord_id, user_name, points, level_of_user } = req.body;
        await promisePool.query('INSERT INTO users (user_discord_id, user_name, points, level_of_user) VALUES (?, ?, ?, ?)', [user_discord_id, user_name, points, level_of_user]);
        res.json({"message": "Usuario agregado exitosamente! 😎"});

    } catch (error) {
        res.status(500).json({"message": "Error al agregar usuario", "Error": error});
    }
});


//En caso de no obtener ninguna request como las anteriores, mandamos este mensaje
app.use((req, res) => {
    res.status(404).json({"message": "404 NOT FOUND"});
});


//Iniciamos el listener del servidor
app.listen(1234, () => {
    console.log(`server listening on port http://localhost:${1234}`);
})
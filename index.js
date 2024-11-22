//? configurar express para backend
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


//? crear el servidor de express
const app = express();

//?base de datos

dbConnection();

//? habilitar cors
//? solo permitir hacer peticiones de un dominio (o varios) en especifico
app.use(cors()); 

//? Directorio Publico
app.use(express.static('public'));

//? rutas 
//? requerimiento, respuesta

//? Directorio del Login y Register

//? lectura y parseo del body
//? middleware
app.use(express.json());

//? leer de derecha a izquierda
//? lo que exporte el archivo auth lo va a habilitar la ruta
app.use('/api/auth', require('./routes/auth'));
//? Directorio para Eventos

//?Ruta para los eventos
app.use('/api/events',require('./routes/events'));

//? escuchar peticiones 
//? variables de entorno
//? en caso de subir mi app a un servidor
//? el servido encuentre este archivo y asigne un puerto
app.listen(process.env.PORT, () => {
    console.log(`servidor en puerto en ${process.env.PORT}`);
    
});

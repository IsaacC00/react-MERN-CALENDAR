//? recuerda los modelos 
//? es como va a lucir mi modelo de usuario 
//? esta informacion es la que se va a almecnar en la base de datos
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = model('Usuario', UsuarioSchema);

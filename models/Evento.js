//? recuerda los modelos 
//? es como va a lucir mi modelo de usuario 
//? esta informacion es la que se va a almecnar en la base de datos
const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user:{
        //? referencia echa con mongoose
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
});

//? con esta modificacion lo que estoy diciendo es que 
//? a este objeto le asigno el id del usuario
//? para poder identificar cada nota con usuario
EventoSchema.method( function(){
    const {__v, _id,...object} = this.toObject();
    object.id = _id;
    return object;
} )

module.exports = model('Evento', EventoSchema);

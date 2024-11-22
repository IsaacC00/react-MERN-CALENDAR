//? JWT me permite manejar la autenticacion de mis usuarios
//? manejar el estado de la sesion de los usuarios
//? mi firma es lo que va a dar el plus al jwtoken para
//? poder confirmar que es un usuario autenticado

const jwt = require('jsonwebtoken');

//? los parametros seran parte de jwt
const generarJWT = (uid,name) => {
    //? regresamos una nueva promesa
    //? que genera el JWT
    return new Promise( (resolve,reject) => {

        //? el payload es una parte del cuerpo del jwt
        const payload = {uid,name};

        //? firmamos el jwt
        //? con 3 cosas
        //? el payload, una variable secreta, y la duracion del jwt
        jwt.sign(payload, process.env.SECRET_WEB_TOKEN,{
            expiresIn:'2h',
        }, 
        //? manejo de errores en caso de fallar el jwt
        (err, token) => {
            if( err ){ 
                console.log(err);
                reject( 'no se pudo generar el token' );
            }
            resolve(token);
        });

    });
}

module.exports = {
    generarJWT
}
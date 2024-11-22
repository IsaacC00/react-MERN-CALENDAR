//? middleware que ayudara a valdiat los jwt
const {response} = require('express');
const {verify} = require('jsonwebtoken');

const validatJWT = (req,res = response,next) => {

    //? recibir JWT
    //? es un eestandar poner 
    //? x-token para recibir cualquiewr tipo de token
    //? lo recibo de los headers
    const token = req.header('x-token')

    //?validar token
    //? en caso de fallar 
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'No existe token en la peticion'
        });
    }

    try {
        //? verificar con jwt si mi token coincide con el de BD
        const {uid,name} = verify(
            token,
            process.env.SECRET_WEB_TOKEN
        )

        req.uid = uid;
        req.name = name;
        
        

    } catch (error) {
       return res.status(401).json({
        ok:false,
        msg:'Token no valido'
       });
        
    }


    //? para ejecutar lo que sigue
   //? next => siguiente 
    next();
    

}

module.exports = {
    validatJWT
}
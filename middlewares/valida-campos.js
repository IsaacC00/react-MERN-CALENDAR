//? middlewares es
//? es un controlador para vaklidar 
//? datos que el usuairo envia en un apeticion

const { response } = require("express")
const { validationResult } = require("express-validator")

//? req = requerimientos par al arespuesta(res)
//? next es lo que se ejecuta si todo sale bien
const validarCampos = (req, res = response, next) => {
    
    //? validacion con express-validator
    //? errors me va a ayudar a enviar las validaciones
    //? con los mensajes
    const errors = validationResult(req);
    
    //? si existen errores entonces vamos a devolver un json con status

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors:errors.mapped()
        });
    }

    next()

}

module.exports = {
    validarCampos

}
//? controllers me van ayudar a validar 
//? en cada uno tendre las validaciones respectivas
const { response, json } = require('express');
const Usuario = require('../models/Usuario');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const {email,password} = req.body;
    //? Ojo debemos de devoilver un solo json
    //? por ello utilizamos el return
    // if (name.length < 4) {
    //     return res.status(400).json({
    //         ok:false,
    //         msg:'Nombre debe ser mayor a 4 caracteres',
    //     });
    // }

    //? guardamos nuestro usuario en la base de datos
    //? mongoose ya sabe camo luce nuestro usuario 
    //? y solo va atomar lo que le interesa del body
    try {

        //? con ayuda de mongoose podemos
        //? verificar si ya existe un usuario 
        //? con el mismo email
        let usuario = await Usuario.findOne({email});

        
        
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'Ya existe un usuario con ese email'
            });
        }   
        
        usuario = new Usuario(req.body);
        
        //? encryptar la contrasenia
        //? las veces que va encryptar(por defecto son 10)
        const salt = genSaltSync();
        //? hasear la contrasenia
        usuario.password = hashSync(password,salt);
        
        await usuario.save();
        //?generar JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            msg: 'registro',
            token,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al crear un nuevo usuario'
        })
    }
};

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;


    try {
        
        let usuario = await Usuario.findOne({email});
        
        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg:'No existe el usuario'
            });
        }  

        //? confirmar las contrasenias
        const validPassword = compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contrasenia o Email no validos'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name:usuario.name,
            msg: 'login',
            token,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al crear un nuevo usuario'
        })
    }

};

const revalidarToken = async(req, res = response) => {

    //? id y nombre del req
    const {uid,name} = req;

    //? crear un nuevo token
    const token = await generarJWT(uid,name);

    res.status(200).json({
        ok: true,
        msg:'Token renovado', 
        uid,
        name,
        token
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}
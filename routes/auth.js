//? Rutas para autenticacion
//? host /api/auth
//? importacion en node.js
const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/valida-campos');
const { validatJWT } = require('../middlewares/validar-jwt');
const router = Router();

//? implementacion de los midlewares
//? o valiadciones para la informacion
//? express-validator en arrays
router.post('/register',
    [
        //?middelwaress
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email debe ser valido').isEmail(),
        check('password','debe ser 6 caracteres como minimo').isLength({min:6}),
        validarCampos

    ],
    crearUsuario);

router.post('/' , [
    check('email','El email debe ser valido').isEmail(),
    check('password','debe ser 6 caracteres como minimo').isLength({min:6}),
    validarCampos

], loginUsuario);

router.post('/renew', validatJWT ,revalidarToken);

module.exports = router;
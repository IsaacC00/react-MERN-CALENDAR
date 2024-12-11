const { Router } = require('express');
const { obtenerEvento, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validatJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/valida-campos');
const { isDate } = require('../helpers/isDate');

//? todas las validaciones deben pasar por el jwt
//? /api/events/
const router = Router();

router.use(validatJWT);

//? Obtener los eventos
router.get('/get',obtenerEvento);

//? crear un nuevo evento
router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha Inicio es obligatorio').custom( isDate ),
    check('end','Fecha de Finalizacion es obligatoria').custom( isDate ),
    validarCampos
],crearEvento);

//? Actualixzar evento
router.put('/:id',actualizarEvento);
//? Borrar evento
router.delete('/:id',eliminarEvento);

module.exports = router;
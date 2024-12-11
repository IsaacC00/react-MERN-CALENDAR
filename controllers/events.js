const { response } = require('express');
const Evento = require('../models/Evento');

const obtenerEvento = async (req, res = response) => {

    try {

        const eventos = await Evento.find().
            //? el metodo populate nos ayuda a hacer relaciones
            //? en este caso con el usuario, ademas podemos traer solo em campo que desemos
            populate('user', 'name email');
        return res.json({
            ok: true,
            msg: 'obtener eventos',
            eventos
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener los eventos',

        });
    }


};

const crearEvento = async (req, res = response) => {

    //?instanciamos nuestro nbuevo evento
    //? con todo lo que se envia en el body
    const evento = new Evento(req.body);

    try {

        //? asignamos un usuario al nuevo evento

        evento.user = req.uid;

        await evento.save();

        return res.json({
            ok: true,
            msg: 'evento creado',
            evento
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json(
            {
                ok: false,
                msg: 'No se pudo crear el evento'
            }
        )

    }

};

const actualizarEvento = async (req, res = response) => {

    //?obtenemos el id del params para saber que evento vamos a actulizar
    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId);

        //? si no existe el evento 
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el evento con ese id'
            });
        }
        //?en caso de que otro usuario quiera cambiar el evento de otra persona

        if (evento.user.toString() !== req.uid) {

            return res.status(401).json({
                ok: false,
                msg: 'Accion no autorizada'
            });
        }

        const newEvento = {
            ...req.body,
            user: req.uid
        }

        //? actualizamos el evento
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, newEvento, { new: true });

        return res.json({
            ok: true,
            msg: 'evento actualizado',
            eventoActualizado,
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el evento'
        });

    }

};

const eliminarEvento = async (req, res = response) => {

    //?obtenemos el id del params para saber que evento vamos a actulizar
    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId);

        //? si no existe el evento 
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el evento con ese id'
            });
        }

        //?en caso de que otro usuario quiera cambiar el evento de otra persona

        if (evento.user.toString() !== req.uid) {

            return res.status(401).json({
                ok: false,
                msg: 'Accion no autorizada'
            });
        }

        //? eliminado el evento
        await Evento.findByIdAndDelete(eventoId);

        return res.json({
            ok: true,
            msg: 'evento eliminado'
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo eliminar el evento'
        });

    }

};

module.exports = {
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}

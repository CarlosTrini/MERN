const {validationResult} = require('express-validator');
const ProyectosSchema = require('../models/ProyectosModel');

exports.crearProyecto = async(req, res) => {

    //validar que el campo nombre no este vacío
    const errores = validationResult(req);    
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //crear nuevo proyecto
        const proyecto = new ProyectosSchema(req.body);

        //guardar el creador via jwt
        proyecto.creador = req.usuario.id;

        //guardar proyecto
        proyecto.save();

        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// OBTIENE LOS PROYECTOS DEL USUARIO ACTUAL
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await ProyectosSchema.find({creador: req.usuario.id}).sort({creado: - 1});
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//ACTUALIZA UN PROYECTO
exports.actualizarProyecto = async (req, res) => {
    //validar que el campo nombre no este vacío
    const errores = validationResult(req);    
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //extraer la informacion del proyecto
    const {nombre} = req.body;
    const nuevoProyecto = {};

    //esto para cada campo... en este caso solo es el campo nombre
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        //revisar ID
        let proyecto = await ProyectosSchema.findById(req.params.id);
        
        //si el proyecto existe o no
        if(!proyecto){
            console.log(proyecto);
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //actualizar
        proyecto = await ProyectosSchema.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true});

        return res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');       
    }
}

//ELIMINAR PROYECTO
exports.eliminarProyecto = async (req, res) => {

    

    try {
        //revisar por el id
        let proyecto = await ProyectosSchema.findById(req.params.id);

        //revisar si el proyecto existe o no
        if (!proyecto) {
            return res.status(400).json({msg: 'Proyecto no encontrado'});
        }

        //verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //eliminar proyecto
        const result = await ProyectosSchema.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'El proyecto ha sido eliminado'});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Error en el servidor'});
    }
}
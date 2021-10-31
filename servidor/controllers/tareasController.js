const TareasSchema = require('../models/TareasModel');
const ProyectoSchema = require('../models/ProyectosModel');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.getTareas = async (req, res) => {
   try {
      //extraer el proyecto para comprobar si existe
      const proyecto = await ProyectoSchema.findById(req.params.proyecto);
      if(!proyecto){
         return res.status(400).json({msg: 'El proyecto no existe'});
      }
      //revisar si el proyecto actual pertenece al usuario autenticado
      if (proyecto.creador.toString() !== req.usuario.id) {
         return res.status(400).json({msg: 'No autorizado'});   
      }
      //obtener las tareas
      const tareas = await TareasSchema.find({proyecto : req.params.proyecto});
      return res.json(tareas);
   } catch (error) {
      console.log(error);      
      return res.status(500).json({msg: 'error en el servidor'});
   }
}

exports.crearTarea = async (req, res) => {
   // validar errores 
   const errores = validationResult(req);
   if (!errores.isEmpty()) {
      return res.status(400).json({errores: errores.array()});
   }

   try {
      const proyectoExist = await ProyectoSchema.findById(req.body.proyecto);
      //extraer el proyecto y comprobar si existe
      if(!proyectoExist){
         return res.status(400).json({msg: 'El proyecto no existe'});
      }
      //revisar si el proyecto actual pertenece al usuario autenticado
      if (proyectoExist.creador.toString() !== req.usuario.id) {
         return res.status(400).json({msg: 'No autorizado'});   
      }
      //crear tarea
      const tarea = new TareasSchema(req.body);
      await tarea.save();
      res.json({tarea});

   } catch (error) {
      console.log(error);      
      return res.status(500).json({msg: 'error en el servidor'});
   }
}

exports.actualizarTarea = async(req, res) => {

   try {
      const {proyecto, nombre, estado} = req.body;
      
      //ver si la tarea existe
      let tareaExist = await TareasSchema.findById(req.params.id);
      if(!tareaExist){
         return res.status(404).json({msg: 'La tarea no existe'});
      }
      
      //extraer el proyecto para comprobar si existe
      const proyectoExist = await ProyectoSchema.findById(proyecto);
      
      //revisar si el proyecto actual pertenece al usuario autenticado
      if (proyectoExist.creador.toString() !== req.usuario.id) {
         return res.status(400).json({msg: 'No autorizado'});   
      }
      
      //crear objeto con la nueva tarea
      let nuevaTarea = {};
         //llenado del objeto de la tarea
      nuevaTarea.nombre = nombre;
      nuevaTarea.estado = estado;

      //guardar al tarea
      tareaExist = await TareasSchema.findOneAndUpdate({id: req.params.id}, nuevaTarea, {new: true});      
      return res.json({tareaExist});
   } catch (error) {
      console.log(error);      
      return res.status(500).json({msg: 'error en el servidor'});
   }   
}


exports.eliminarTarea = async(req, res) => {

   try {
      const {proyecto} = req.query;
      //ver si la tarea existe
      let tareaExist = await TareasSchema.findById(req.params.id);
      if(!tareaExist){
         return res.status(404).json({msg: 'La tarea no existe'});
      }

      
      //extraer el proyecto para comprobar si existe
      const proyectoExist = await ProyectoSchema.findById(proyecto);

      //revisar si el proyecto actual pertenece al usuario autenticado
      if (proyectoExist.creador.toString() !== req.usuario.id) {
         return res.status(400).json({msg: 'No autorizado'});   
      }
      
      //eliminar tarea
      await TareasSchema.findOneAndRemove({_id: req.params.id});
      res.json({msg: 'Tarea eliminada'});

   } catch (error) {
      console.log(error);      
      return res.status(500).json({msg: 'error en el servidor'});
   }   
}

const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


// api/proyectos 
router.post('/',
    [
        check('nombre', 'El proyecto require un nombre').not().isEmpty()
    ], 
    auth,
    proyectoController.crearProyecto
);

// OBTENER LOS PROYECTOS
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
);

//ACTUALIZAR UN PROYECTO
router.put('/:id', 
    auth,
    [
        check('nombre', 'El proyecto require un nombre').not().isEmpty()
    ], 
    proyectoController.actualizarProyecto
);

//ELIMINAR UN PROYECTO
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;

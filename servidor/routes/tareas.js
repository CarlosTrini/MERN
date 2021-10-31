const router = require('express').Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const TareasController = require('../controllers/tareasController');


router.get('/:proyecto', auth,TareasController.getTareas );

router.post('/', 
   auth,
   [
      check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
      check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
   ],
   TareasController.crearTarea
);

router.put('/:id',
   auth,
   TareasController.actualizarTarea
);

 router.delete('/:id', auth, TareasController.eliminarTarea);

module.exports = router;
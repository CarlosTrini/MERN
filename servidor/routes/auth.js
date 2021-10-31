const express = require('express');
const route = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


//inicia sesión
// api/auth
route.post('/', 
    authController.autenticarUsuario
);

route.get('/', 
    auth,
    authController.usuarioAutenticado
 );

module.exports = route;
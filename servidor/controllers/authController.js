const UsuarioSchema = require('../models/UsuarioModel');
let bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    //extraer el usuario (email) y el password
    const {email, password} = req.body;

    try {
        //revisar que sea un usuario registrado en la base de datos
        let usuario = await UsuarioSchema.findOne({email})
        if(!usuario){
            console.log(usuario);
            return res.status(400).json({msg: 'Este usuario no existe'});
        }

        //revisar su password
        //compare revisa que las claves sean las mismas... 
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'La contraseña no es correcta'});
        }

         //crear y firmar el jwt
         const payload = {
            usuario :{
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000 // 1 hora
        },(error, token) => {
            if(error) throw error;

            //mensaje de exito
            res.json({token})
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'Error al autenticar al usuario'});
    }
}


//OBTIENE AL USUARIO QUE ESTÁ AUTENTICADO ACTUALMENTE
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await UsuarioSchema.findById(req.usuario.id).select('-password');
        res.json({usuario});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Ha ocurrido un error'});
    }
}
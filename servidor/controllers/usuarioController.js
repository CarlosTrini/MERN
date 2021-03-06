const UsuarioSchema = require('../models/UsuarioModel');
let bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req, res) => {

    //validar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //extraer email y password de los datos recibidos
    const {email, password} = req.body;

    try {
        let usuario;
        //revisar que el email no exista
        usuario = await UsuarioSchema.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'Este correo ya se encuentra registrado'});
        }
        
        
        //crea el nuevo usuario
        usuario = new UsuarioSchema(req.body);

        //hashear la password del usuario
        const salt = await bcryptjs.genSalt(10); //salt genera hash unicos
        usuario.password = await bcryptjs.hash(password, salt);

        //guarda el usuario
        await usuario.save();

        //crear y firmar el jwt
        const payload = {
            usuario :{
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000 //segundos = 1 hora
        }, (error, token) => {
            if(error) throw error;

            //responde con exito
            res.json({token});
        });

         


    } catch (error) {
        console.log(error);
        res.status(400).send('Ocurrió un error al realizar el nuevo registro');
    }
}


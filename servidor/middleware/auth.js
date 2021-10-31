const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    
    //leer el token
    const token = req.header('x-auth-token');

    //revisar si no hay token
    if (!token) {
        return res.status(401).json({msg: 'No existe TOKEN. Permiso denegado'});
    }

    //validar si si hay token
    try {

        const cifrado = jwt.verify(token, process.env.SECRET);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({msg: 'TOKEN no es válido'});
    }
}